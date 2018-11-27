import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'localizedDate',
  pure: false
})
export class LocalizedDatePipe implements PipeTransform {

  constructor(private translateService: TranslateService) {
  }

  transform(value: any, pattern: string = 'dd MMM yyyy'): any {
    let lang = ( this.translateService.currentLang != 'null' ? this.translateService.currentLang : 'id' );
    const datePipe: DatePipe = new DatePipe(lang);
    return datePipe.transform(value, pattern);
  }

}
