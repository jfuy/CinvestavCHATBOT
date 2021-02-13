// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import 'zone.js/dist/zone-testing';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

/**
 * Variable para indicar requerimientos
 */
declare const require: any;

/**
 * Primero se inicializa el ambiente para el testing de Angular
 */
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);
// Then we find all the tests.
/**
 * Despues nosotros buscamos todos los test
 */
const context = require.context('./', true, /\.spec\.ts$/);
// And load the modules.
/**
 * y cargamos todos los modulos
 */
context.keys().map(context);
