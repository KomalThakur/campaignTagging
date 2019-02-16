import { Injectable } from "@angular/core";
@Injectable({
  providedIn: "root"
})
export class SearchPipe {
  transform(items: any[], searchText: string): any[] {
    if (!items) return [];
    if (!searchText) return items;
    searchText = searchText.toLowerCase();
    return items.filter(it => {
      return it.name.toLowerCase().includes(searchText) ||
      it.channel.toLowerCase().includes(searchText) || it.campaignType.toLowerCase().includes(searchText) ||
      it.campaignCategory.toLowerCase().includes(searchText) || it.phase.toLowerCase().includes(searchText) 
      || it.messageType.toLowerCase().includes(searchText) 
    });
  }
}
