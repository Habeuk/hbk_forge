<?php

namespace Drupal\hbk_cforge;

class ThemeSettings {

  /**
   * Les types de champs qui ont besoin "form-control".
   *
   * @var array
   */
  public static $control_inputs = [
    'email',
    'textfield',
    'number',
    'select',
    'search_api_autocomplete',
    'phone_international',
    'password',
    'entity_autocomplete',
    'managed_file',
    'file',
    'date',
    'search'
    // 'submit' ne doit pas etre ici, car il na pas besoin de form-control.
  ];

  /**
   * Les types de champs qui ont besoins de "form-check-input".
   *
   * @var array
   */
  public static $check_inputs = [
    // 'checkbox',
    'checkboxes',
    'radio',
    'radios'
  ];

}