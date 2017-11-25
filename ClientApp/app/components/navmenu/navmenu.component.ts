import { Component, ViewEncapsulation, ViewChild, PLATFORM_ID, Inject } from '@angular/core';
import { ObservableMedia } from '@angular/flex-layout';
import { MatSidenav } from '@angular/material';
import { isNullOrUndefined } from 'util';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

@Component({
    selector: 'nav-menu',
    templateUrl: './navmenu.component.html',
    styleUrls: ['./navmenu.component.scss']
})
export class NavMenuComponent {
    private _navLinks: NavLink[] = [
        {
            AnchorClasses: ["toolBarLinkText"],
            Link: "/home",
            Icon: "home",
            ItemClasses: ["toolbarItem"],
            LinkText: "Home"
        },
        {
            AnchorClasses: ["toolBarLinkText"],
            Link: "/sampleForm",
            Icon: "description",
            ItemClasses: ["toolbarItem"],
            LinkText: "Sample Form"
        },
        {
            AnchorClasses: ["toolBarLinkText"],
            Link: "/animalForm",
            Icon: "description",
            ItemClasses: ["toolbarItem"],
            LinkText: "Animal Form"
        },
        {
            AnchorClasses: ["toolBarLinkText"],
            Link: "/ex-table",
            Icon: "description",
            ItemClasses: ["toolbarItem"],
            LinkText: "Samples"
        },
        {
            AnchorClasses: ["toolBarLinkText"],
            Link: "/animal-table",
            Icon: "description",
            ItemClasses: ["toolbarItem", "fill-remaining-space"],
            LinkText: "Animals"
        },
        {
            AnchorClasses: ["toolBarLinkText"],
            Link: "/fetch-data",
            Icon: "account_circle",
            ItemClasses: ["block"],
            LinkText: "Login"
        }
    ];
    
    @ViewChild('sidenav') public SideNav: MatSidenav;
    constructor(public media: ObservableMedia, @Inject(PLATFORM_ID) platformId: any, private router: Router) {
        router.events.subscribe((val) => {
            this.SideNav.close();
        });
        media.asObservable().subscribe(mChange => {
            if (this.SideNav != null || this.SideNav != undefined && mChange.mqAlias != 'xs' && mChange.mqAlias !== 'sm')
                this.SideNav.close();
        })
    }

    get NavLinks(): NavLink[] {
        return this._navLinks;
    }
}


interface NavLink {
    AnchorClasses: string[];
    Link: string;
    Icon: string;
    ItemClasses: string[];
    LinkText: string;
}