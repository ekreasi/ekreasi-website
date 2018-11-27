import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'excerpt'
})

export class ExcerptFilter implements PipeTransform {
  transform(text: String, length: any ): any {
    text = this.strip_tags(text, [text, "b", "i", "u"]);

    var re = new RegExp("<br>", 'g');
    text = text.replace(re,"");
    let innerText;
    if (text.includes('</')) {
      innerText = text.substr(Number(text.search('>')) + 1, text.search('</'));
    } else {
      innerText = text;
    }

    if (!innerText || !length) {
      return innerText;
    }

    if (innerText.length > length) {
      return innerText.substr(0, length) + '...';
    }

    return innerText;

  }

  strip_tags(_html, args) {
    var _tags = [], _tag = "";
    for (var _a = 1; _a < args.length; _a++) {
      _tag = args[_a].replace(/<|>/g, '').trim();
      if (args[_a].length > 0) _tags.push(_tag, "/" + _tag);
    }

    if (!(typeof _html == "string") && !(_html instanceof String)) return "";
    else if (_tags.length == 0) return _html.replace(/<(\s*\/?)[^>]+>/g, "");
    else {
      var _re = new RegExp("<(?!(" + _tags.join("|") + ")\s*\/?)[^>]+>", "g");
      return _html.replace(_re, '');
    }
  }
}