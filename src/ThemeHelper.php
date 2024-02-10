<?php

namespace Drupal\hbk_cforge;

class ThemeHelper {

  /**
   *
   * @param array $variables
   */
  static function getSiteInformation(&$variables) {
    $site_name = \Drupal::config('system.site')->get('name');
    // set the variable site name for render
    $variables["site_name"] = $site_name;
    $logo_path = \Drupal::theme()->getActiveTheme()->getLogo();
    if ($logo_path) {
      $site_logo = [
        '#theme' => 'image',
        '#alt' => $site_name, // eg.
        '#uri' => $logo_path
      ];
      // set the variables for the site logo
      $variables["site_logo"] = $site_logo;
    }
  }

  /**
   * Permet de retourner la bonne valeur de la clée.
   * Les données de configuration ne supporte pas "%% key contains a dot which
   * is not supported".
   * On remplace . par - afin de differencie avec les _ definis au niveau du nom
   * de la reoute.
   */
  public static function getValidKeyForConfig($key) {
    return str_replace(".", '-', $key);
  }

}