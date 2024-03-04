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
  // Vertical tabs.
  $form['hbk_cforge_settings'] = [
    '#type' => 'vertical_tabs',
    '#prefix' => '<h2><small>' . t('Customize the appearance of your site') . '</small></h2>',
    '#weight' => -20
  ];
  /**
   * Select templates for pages.
   */
  $form['hbk_cforge_node_template'] = [
    '#type' => 'details',
    '#title' => t('Node template'),
    '#description' => t('Select node models for teaser rendering'),
    '#group' => 'hbk_cforge_settings',
    '#tree' => true,
    '#open' => false
  ];
  // get nodes type
  $node_types = \Drupal::entityTypeManager()->getStorage('node_type')->loadMultiple();
  if ($node_types) {
    foreach ($node_types as $node_type) {
      $id = $node_type->id();
      $form['hbk_cforge_node_template'][$id]['teaser'] = [
        '#type' => 'select',
        '#title' => $node_type->label(),
        '#options' => [
          '' => t('Title above the image'),
          'hbk_full_text' => t('Full text')
        ],
        '#default_value' => theme_get_setting('hbk_cforge_node_template.' . $id . '.teaser')
      ];
    }
  }
  /**
   * Display title.
   */
  $form['hbk_cforge_title_display'] = [
    '#type' => 'details',
    '#title' => t('Page title'),
    '#description' => t("Manage title display"),
    '#group' => 'hbk_cforge_settings',
    '#tree' => true,
    '#open' => false
  ];
  $form['hbk_cforge_title_display']['hidden'] = [
    '#type' => 'checkbox',
    '#title' => t('Hides the system-generated title'),
    '#description' => t("You need to enable the 'Page Title' rendering block"),
    '#default_value' => theme_get_setting('hbk_cforge_title_display.hidden')
  ];

  $form['hbk_cforge_menu_display'] = [
    '#type' => 'details',
    '#title' => t('Menu display'),
    '#description' => t("Manage how menus are displayed"),
    '#group' => 'hbk_cforge_settings',
    '#tree' => true,
    '#open' => false
  ];
  $tempaltes_menus = [
    '' => t("Default display"),
    'hbk_menu_vertical' => t('Vertical align'),
    'hbk_menu_horizontal' => t('Display with submenu')
  ];
  $menus = \Drupal\system\Entity\Menu::loadMultiple();
  foreach ($menus as $menu) {
    $id = $menu->id();
    $form['hbk_cforge_menu_display'][$id] = [
      '#type' => 'details',
      '#title' => $menu->label(),
      '#options' => $tempaltes_menus,
      '#default_value' => theme_get_setting('hbk_cforge_menu_display.' . $id)
    ];
    $form['hbk_cforge_menu_display'][$id]['template'] = [
      '#type' => 'select',
      '#title' => 'Template',
      '#options' => $tempaltes_menus,
      '#default_value' => theme_get_setting('hbk_cforge_menu_display.' . $id . '.template')
    ];
    $form['hbk_cforge_menu_display'][$id]['slogan'] = [
      '#type' => 'checkbox',
      '#title' => "Afficher le slogan",
      '#default_value' => theme_get_setting('hbk_cforge_menu_display.' . $id . '.slogan')
    ];
    $form['hbk_cforge_menu_display'][$id]['logo'] = [
      '#type' => 'checkbox',
      '#title' => "Afficher le logo",
      '#default_value' => theme_get_setting('hbk_cforge_menu_display.' . $id . '.logo')
    ];
    $form['hbk_cforge_menu_display'][$id]['name'] = [
      '#type' => 'checkbox',
      '#title' => "Afficher le nom du site",
      '#default_value' => theme_get_setting('hbk_cforge_menu_display.' . $id . '.name')
    ];
  }

  // ////////////////////////////
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
    '#tree' => TRUE,
    '#weight' => 0
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
    '#title' => t('Select a color'),
    '#tree' => TRUE,
    '#open' => TRUE,
    '#weight' => 0
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
  $form["#submit"][] = "_clear_cache";
}

function _clear_cache(&$form, &$form_state) {
  $configs = $form_state->getValue("hbk_cforge");
  if ($configs["old_theme"] != $configs["current_theme"]) {
    drupal_flush_all_caches();
  }
}
