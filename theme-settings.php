<?php
use Drupal\hbk_cforge_mod\Plugin\Block\SocialLinksBlock;

/**
 *
 * @file
 * Theme settings form for HBK cforge theme.
 */

/**
 * Implements hook_form_system_theme_settings_alter().
 */
function hbk_cforge_form_system_theme_settings_alter(&$form, &$form_state) {
  $configs = \Drupal::Config('hbk_cforge.settings')->get();
  $theme_list = [
    "teal" => t("Teal"),
    "passion" => t("Passion"),
    "dark" => t("Dark"),
    "purple" => t("Purple"),
    "orange" => t("orange"),
    "brown" => t('brown'),
    "blue" => t('blue'),
    "green" => t('green')
  ];

  /**
   *
   * @var SocialLinksBlock $social
   */
  $social = \Drupal::service('plugin.manager.block')->createInstance('hbk_cforge_mod_block_social_links');

  $to_unset = [
    "#theme",
    "#attributes",
    "actions",
    "var",
    "config_key",
    "theme_settings"
  ];
  // $to_unset = [];
  $social_block_configs = $social->blockForm($form, $form_state);
  foreach ($form as $key => $value) {
    unset($social_block_configs[$key]);
  }
  $form["social"] = [
    '#type' => 'details',
    '#title' => t('Social block'),
    '#tree' => TRUE
  ];
  $form["social"] += $social_block_configs;

  foreach ($to_unset as $value) {
    unset($form["social"][$value]);
  }
  // set social defaults values
  foreach ($form["social"] as $key => $value) {
    if ($key[0] != "#") {
      # code...
      $form["social"][$key]["#default_value"] = $configs["social"][$key] ?? "";
    }
  }

  $form['social']["show_social"] = [
    "#type" => 'checkbox',
    '#title' => t("Show the social block on page"),
    '#description' => t("whether or not the social block on the bottom should be shown"),
    '#default_value' => $configs['social']['show_social'] ?? FALSE
  ];

  $form['hbk_cforge'] = [
    '#type' => 'details',
    '#title' => t('HBK cforge'),
    '#tree' => TRUE,
    '#open' => TRUE
  ];

  $form['hbk_cforge']['current_theme'] = [
    '#type' => 'select',
    '#title' => t('Theme color'),
    "#options" => $theme_list,
    '#default_value' => $configs['hbk_cforge']["current_theme"] ?? "teal"
  ];

  $form['hbk_cforge']['old_theme'] = [
    '#type' => 'hidden',
    '#title' => t('Old Theme'),
    '#default_value' => $configs['hbk_cforge']["current_theme"] ?? ""
  ];
  $form["#submit"][] = "_just_test";
}

function _just_test(&$form, &$form_state) {
  $configs = $form_state->getValue("hbk_cforge");
  if ($configs["old_theme"] != $configs["current_theme"]) {
    drupal_flush_all_caches();
  }
}
