import { Component, ViewEncapsulation, ViewChild, PLATFORM_ID, Inject } from '@angular/core';
import { ObservableMedia } from '@angular/flex-layout';
import { MatSidenav } from '@angular/material';
import { isNullOrUndefined } from 'util';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

@Component({
    selector: 'nav-menu',
    templateUrl: './navmenu.component.html',
    styleUrls: ['./navmenu.component.scss'],
    encapsulation: ViewEncapsulation.None
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
            Link: "/counter",
            Icon: "description",
            ItemClasses: ["toolbarItem"],
            LinkText: "Counter"
        },
        {
            AnchorClasses: ["toolBarLinkText"],
            Link: "/ex-table",
            Icon: "description",
            ItemClasses: ["toolbarItem","fill-remaining-space"],
            LinkText: "Samples"
        },
        {
            AnchorClasses: ["toolBarLinkText"],
            Link: "/fetch-data",
            Icon: "account_circle",
            ItemClasses: ["block"],
            LinkText: "Login"
        }
    ];
    @ViewChild('sidenav') public SideNav : MatSidenav;
    constructor(public media:ObservableMedia, @Inject(PLATFORM_ID) platformId: any, private router:Router){
        router.events.subscribe((val) => {
            this.SideNav.close();             
        });
        media.asObservable().subscribe(e =>{
            if(this.SideNav != null || this.SideNav != undefined && e.mqAlias != 'xs'  && e.mqAlias !== 'sm')
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