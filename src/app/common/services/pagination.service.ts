import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import * as _ from 'underscore';

@Injectable()
export class PaginationService {

	/*getPager(totalItems: number, currentPage: number = 1, pageSize: number = 4) {
        // calculate total pages
        let totalPages = Math.ceil(totalItems / pageSize);
 
        let startPage: number, endPage: number;
        startPage = 1;
        endPage = totalPages;
        
        // calculate start and end item indexes
        let startIndex = (currentPage - 1) * pageSize;
        let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
 
        // create an array of pages to ng-repeat in the pager control
        let pages = _.range(startPage, endPage + 1);
 
        // return object with all pager properties required by the view
        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };
    }*/

    getPager(totalItems: number, currentPage: number = 1, 
             pageSize: number = 4, totalPages: number) {
        // calculate total pages
        //let totalPages = Math.ceil(totalItems / pageSize);
 
        let startPage: number, endPage: number;
        startPage = currentPage > 1 ? currentPage -1: 1;
        //endPage = currentPage < totalItems ? currentPage + 1: totalItems;
        
        if(currentPage === 1){
            endPage = currentPage + 2;
        }
        else if(currentPage < totalItems) {
            endPage = currentPage + 1;
        }
        else{
            endPage = totalItems;
        }

        // calculate start and end item indexes
        let startIndex = (currentPage - 1) * pageSize;
        let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
 
        // create an array of pages to ng-repeat in the pager control
        let pages = _.range(startPage, endPage + 1);
 
        // return object with all pager properties required by the view
        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };
    }

    parseLinks(response: Response):any{

        const DELIM_LINKS = ",";
        const DELIM_LINK_PARAM = ";"; 

        let first: string;
        let last: string;
        let next: string;
        let prev: string;

        let linkHeader = response.headers.get('link');
        if (linkHeader != null) {
            let links = linkHeader.split(DELIM_LINKS);
            
            for (var i = 0; i < links.length; i++) {
                
                let link = links[i];
                let segments = link.split(DELIM_LINK_PARAM);
                if (segments.length < 2){                    
                    continue;
                }

                let linkPart:string = segments[0].trim();
                if (!linkPart.startsWith("<") || !linkPart.endsWith(">")){
                    continue;
                }
                    
                linkPart = linkPart.substring(1, linkPart.length - 1);

                for (var j = 1; j < segments.length; j++) {
                    let rel: string[] = segments[j].trim().split("="); //$NON-NLS-1$
                    if (rel.length < 2 || "rel" !== rel[0]){                        
                       continue;
                    }

                    let relValue: string = rel[1];
                    if (relValue.startsWith("\"") && relValue.endsWith("\"")){
                        relValue = relValue.substring(1, relValue.length - 1);
                    }
                        
                    if ("first" === relValue){                        
                        first = linkPart;
                    }
                    else if ("last" === relValue){                        
                        last = linkPart;
                    }
                    else if ("next" === relValue){                        
                        next = linkPart;
                    }
                    else if ("prev" === relValue){                        
                        prev = linkPart;
                    }
                }
            }
        } /*else {
            next = response.getHeader(HEADER_NEXT);
            last = response.getHeader(HEADER_LAST);
        }*/
        let totalPages = last.substring(last.lastIndexOf("=")+1, last.length);

        return {
            first: first,
            last: last,
            next: next,
            previous: prev,
            totalPages: totalPages
        };
    }
}