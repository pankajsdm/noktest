import { Pipe, PipeTransform } from "@angular/core"
//import { DomSanitizer } from "@angular/platform-browser"

@Pipe({
  name: "isFevorite",
  pure: false
})
export class IsFevoritePipe implements PipeTransform {

  transform(data?: any) {
    return "pankaj";
    //return this.sanitizer.bypassSecurityTrustResourceUrl(url)
  }

}
