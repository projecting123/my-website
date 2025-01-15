import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import {
  matHomeOutline,
  matNotificationsOutline,
  matSettingsOutline,
  matQuestionMarkOutline,
  matBookOutline,
  matQuizOutline,
  matPictureAsPdfOutline,
  matArrowCircleRightOutline,
  matArrowCircleLeftOutline,
} from '@ng-icons/material-icons/outline';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CRLinkDirective } from '../../../directives/crlink.directive';
import { sidebarAnimation } from '../../../app/animation';
import { NgClass, NgIf } from '@angular/common';
import { SettingsService } from '../../../services/settings.service';
import { Subscription } from 'rxjs';
import { TooltipDirective } from '../../../directives/tooltip.directive';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  imports: [
    RouterLink,
    CRLinkDirective,
    TooltipDirective,
    RouterLinkActive,
    NgIcon,
    NgIf,
    NgClass,
  ],
  viewProviders: [
    provideIcons({
      matHomeOutline,
      matNotificationsOutline,
      matSettingsOutline,
      matQuestionMarkOutline,
      matBookOutline,
      matQuizOutline,
      matPictureAsPdfOutline,
      matArrowCircleRightOutline,
      matArrowCircleLeftOutline,
    }),
  ],

  host: {
    '[class]': 'isExpanded() ? "expanded" : ""',
    '[@sidebarAnimation]': 'isExpanded() ? "expanded" : "collapsed"',
  },
  animations: [sidebarAnimation],
})
export class SidebarComponent implements OnInit, OnDestroy{
  private readonly settings = inject(SettingsService);
  private readonly subscription = new Subscription();
  readonly isExpanded = signal(false);
  
  ngOnInit() {
    const sidebarSubscription = this.settings.isExpandedSidebar$.subscribe(value => this.isExpanded.set(value));
    this.subscription.add(sidebarSubscription);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  readonly topLevelLinks = [
    {
      name: 'Home',
      link: './',
      icon: 'matHomeOutline',
    },
    {
      name: 'Courses',
      link: './courses',
      icon: 'matBookOutline',
    },
    {
      name: 'Quiz',
      link: './quiz',
      icon: 'matQuizOutline',
    },
    {
      name: 'Materials',
      link: './materials',
      icon: 'matPictureAsPdfOutline',
    },
    {
      name: 'Notifications',
      link: './notifications',
      icon: 'matNotificationsOutline',
    },
  ];

  readonly bottomLevelLinks = [
    {
      name: 'Settings',
      link: './settings',
      icon: 'matSettingsOutline',
    },
    {
      name: 'FAQ',
      link: './faq',
      icon: 'matQuestionMarkOutline',
    },
  ];
}
