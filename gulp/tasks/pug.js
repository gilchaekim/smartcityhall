import { src, dest } from 'gulp';
import {config, buildDir} from "./../config";
import plugins from "./plugins";
import browserSync from 'browser-sync';
import beautify from "gulp-beautify";
import htmlbeautify from 'gulp-html-beautify';
import {
  printError,
  logError
} from '../util/util';
import { render } from 'pug';

const pugBuild = (path) => {
  console.log(path);
  let sourceSrc = typeof path === 'string'?path:config.source.pug;
  let reload = true;
  return src(sourceSrc)
  .pipe(
    plugins.pug({
      pretty: true,
      filename: 'index.pug',
      filters:{
        code:(text) => {
          return render(`include index.pug\n\nsection.code_view\n  ${text.trim().split('\n').join('\n  ')}\n\ndiv.code_block\n  .code_html\n    p.title html\n    pre\n      code.language-html\n  .code_pug\n    p.title pug\n    pre\n      code.language-scss\n        | ${text.trim().split('\n').join('\n        | ')}`, {
            filename: 'index.pug'
          });
        }
        // code:(text) => {
        //   return render(`include index.pug\n\nsection.code_view\n  ${text.trim().split('\n').join('\n  ')}\n\ndiv.code_block\n  .pug_code\n    pre\n      code\n        | ${text.trim().split('\n').join('\n  ')} |\n  .html_code\n    ${text.trim().split('\n').join('\n  ')}`, {
        //     filename: 'index.pug'
        //   });
        // }
      }
    })
  )
  .on('error', function (error) {
    console.log(error)
    browserSync.notify(printError(error), 25000);
    reload = false;
    this.emit('end');
    logError(error.name, error.message);
  })
  // .pipe(beautify.html({ indent_size: 2 }))
  .pipe(htmlbeautify({ 
    "indent_size": 4,
    "indent_level": 1,
    "indent_with_tabs": false,
    "preserve_newlines": true,
    "max_preserve_newlines": 1,
    "jslint_happy": false,
    "space_after_anon_function": false,
    "brace_style": "collapse",
    "keep_array_indentation": false,
    "keep_function_indentation": false,
    "space_before_conditional": true,
    "break_chained_methods": false,
    "eval_code": false,
    "unescape_strings": false,
    "wrap_line_length": 0,
    "wrap_attributes": "auto",
    "wrap_attributes_indent_size": 4,
    "end_with_newline": false
  }))
  .pipe(dest(buildDir))
  .on('end', () => {
    reload && browserSync.reload();
  })
}

export default pugBuild;