<?php

/**
 * @file
 * Theme settings form for HBK cforge theme.
 */

/**
 * Implements hook_form_system_theme_settings_alter().
 */
function hbk_cforge_form_system_theme_settings_alter(&$form, &$form_state) {

  $form['hbk_cforge'] = [
    '#type' => 'details',
    '#title' => t('HBK cforge'),
    '#open' => TRUE,
  ];

  $form['hbk_cforge']['font_size'] = [
    '#type' => 'number',
    '#title' => t('Font size'),
    '#min' => 12,
    '#max' => 18,
    '#default_value' => theme_get_setting('font_size'),
  ];
  $configs = \Drupal::Config('hbk_cforge.settings')->get();
  // dump($configs);
}
