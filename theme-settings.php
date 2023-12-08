<?php

/**
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
  ];



  $form['hbk_cforge'] = [
    '#type' => 'details',
    '#title' => t('HBK cforge'),
    '#tree' => TRUE,
    '#open' => TRUE,
  ];

  $form['hbk_cforge']['current_theme'] = [
    '#type' => 'select',
    '#title' => t('Theme color'),
    "#options" => $theme_list,
    '#default_value' => $configs['hbk_cforge']["current_theme"] ?? "teal",
  ];

  $form['hbk_cforge']['old_theme'] = [
    '#type' => 'hidden',
    '#title' => t('Old Theme'),
    '#default_value' => $configs['hbk_cforge']["current_theme"] ?? "",
  ];
  // dump($configs);
  $form["#submit"][] = "_just_test";
}

function _just_test(&$form, &$form_state) {
  $configs = $form_state->getValue("hbk_cforge");
  if ($configs["old_theme"] != $configs["current_theme"]) {
    drupal_flush_all_caches();
  }
}
