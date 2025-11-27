export const websiteStyles: Record<string, string> = {
  "cbsnews.com": `
/* CBS News specific styling */
html[data-theme-hub-dark-cbsnews-com] .content__main {
  background-color: #2d2d2d !important;
  color: #ffffff !important;
}

html[data-theme-hub-dark-cbsnews-com] .content__headline {
  color: #ffffff !important;
}

html[data-theme-hub-dark-cbsnews-com] .content__body {
  color: #e0e0e0 !important;
}

html[data-theme-hub-dark-cbsnews-com] .content__meta {
  color: #b0b0b0 !important;
}

html[data-theme-hub-dark-cbsnews-com] .content__section {
  background-color: #333333 !important;
  color: #ffffff !important;
}

html[data-theme-hub-dark-cbsnews-com] .content__section h2 {
  color: #ffffff !important;
}

html[data-theme-hub-dark-cbsnews-com] .content__section p {
  color: #e0e0e0 !important;
}

/* Navigation */
html[data-theme-hub-dark-cbsnews-com] .navigation {
  background-color: #333333 !important;
  color: #ffffff !important;
}

html[data-theme-hub-dark-cbsnews-com] .navigation a {
  color: #ffffff !important;
}

html[data-theme-hub-dark-cbsnews-com] .navigation a:hover {
  color: #60a5fa !important;
}

/* Cards and containers */
html[data-theme-hub-dark-cbsnews-com] .card {
  background-color: #2d2d2d !important;
  color: #ffffff !important;
  border-color: #404040 !important;
}

html[data-theme-hub-dark-cbsnews-com] .card h3 {
  color: #ffffff !important;
}

html[data-theme-hub-dark-cbsnews-com] .card p {
  color: #e0e0e0 !important;
}
  `,
  "schoology.com": `
/* Schoology Dark Mode Theme (Filter-based) */
html[data-theme-hub-dark-schoology-com] {
  filter: invert(1) hue-rotate(180deg);
  background: #1a1919;
}

html[data-theme-hub-dark-schoology-com] img,
html[data-theme-hub-dark-schoology-com] video,
html[data-theme-hub-dark-schoology-com] svg,
html[data-theme-hub-dark-schoology-com] iframe,
html[data-theme-hub-dark-schoology-com] picture,
html[data-theme-hub-dark-schoology-com] source,
html[data-theme-hub-dark-schoology-com] object,
html[data-theme-hub-dark-schoology-com] embed,
html[data-theme-hub-dark-schoology-com] canvas,
html[data-theme-hub-dark-schoology-com] .fc-event-skin.ev-course,
html[data-theme-hub-dark-schoology-com] .dlCBz,
html[data-theme-hub-dark-schoology-com] .legend-course,
html[data-theme-hub-dark-schoology-com] .Card-card-image-uV6Bu,
html[data-theme-hub-dark-schoology-com] #collection-title .icon,
html[data-theme-hub-dark-schoology-com] #resources-left-menu-wrapper .inline-icon,
html[data-theme-hub-dark-schoology-com] #toolbar-add span span,
html[data-theme-hub-dark-schoology-com] #toolbar-add-question span span,
html[data-theme-hub-dark-schoology-com] .folder-icon,
html[data-theme-hub-dark-schoology-com] .share-calendar-option .ical-popup,
html[data-theme-hub-dark-schoology-com] .share-calendar-option a,
html[data-theme-hub-dark-schoology-com] .fcalendar-filter-menu-wrapper .realm-user .realm-title,
html[data-theme-hub-dark-schoology-com] .fcalendar-filter-menu-wrapper.use-subtitles .has-subtitle .realm-title-wrapper,
html[data-theme-hub-dark-schoology-com] .adv-option-btn.toggle-comments.adv-option-on,
html[data-theme-hub-dark-schoology-com] #calender-smartbox-tabs .active span,
html[data-theme-hub-dark-schoology-com] #attachment-selector .infotip,
html[data-theme-hub-dark-schoology-com] .mini.event-icon,
html[data-theme-hub-dark-schoology-com] .notification-settings-wrapper .link-btn span,
html[data-theme-hub-dark-schoology-com] #left-nav #menu-s-main .menu a span,
html[data-theme-hub-dark-schoology-com] .common-assessment-icon,
html[data-theme-hub-dark-schoology-com] #collection-title .school-profile-link,
html[data-theme-hub-dark-schoology-com] .edge-filter-option.edge-filter-type-all span,
html[data-theme-hub-dark-schoology-com] .edge-filter-option.edge-filter-type-child-updates span,
html[data-theme-hub-dark-schoology-com] .edge-filter-option.edge-filter-type-polls span,
html[data-theme-hub-dark-schoology-com] #edit-course-switcher-select-nid-menu .ui-selectmenu-group li a,
html[data-theme-hub-dark-schoology-com] #left-nav #menu-s-main .menu a span,
html[data-theme-hub-dark-schoology-com] .enrollment-admin .user-name .admin-icon,
html[data-theme-hub-dark-schoology-com] .attendance-course-title,
html[data-theme-hub-dark-schoology-com] body .submit-span-wrapper,
html[data-theme-hub-dark-schoology-com] .course-materials-added,
html[data-theme-hub-dark-schoology-com] .grade-post,
html[data-theme-hub-dark-schoology-com] .all-icon.notify-icon,
html[data-theme-hub-dark-schoology-com] .notif-filter .notify-icon,
html[data-theme-hub-dark-schoology-com] .link-btn.download span,
html[data-theme-hub-dark-schoology-com] .library-collection .collection-title.resources-app-title:hover .app-logo img,
html[data-theme-hub-dark-schoology-com] .library-collection .collection-title.resources-app-title.active .app-logo img,
html[data-theme-hub-dark-schoology-com] .edge-filter-option.edge-filter-type-updates span,
html[data-theme-hub-dark-schoology-com] .update-sentence-inner>.arrow-right,
html[data-theme-hub-dark-schoology-com] .gradebook-course-title .arrow,
html[data-theme-hub-dark-schoology-com] body span.infotip,
html[data-theme-hub-dark-schoology-com] #s-grades-export-form-1 .form-checkbox-title,
html[data-theme-hub-dark-schoology-com] .attach-file-icon,
html[data-theme-hub-dark-schoology-com] .my-courses-item-list .admin-icon,
html[data-theme-hub-dark-schoology-com] .my-groups-item-list .admin-icon,
html[data-theme-hub-dark-schoology-com] .my-courses-item-list .admin-icon-shield,
html[data-theme-hub-dark-schoology-com] .my-groups-item-list .admin-icon-shield,
html[data-theme-hub-dark-schoology-com] .assignment-submitting-success-successImage-2223124178,
html[data-theme-hub-dark-schoology-com] input[type="submit"],
html[data-theme-hub-dark-schoology-com] input[type="button"] {
  filter: invert(1) hue-rotate(180deg);
}

html[data-theme-hub-dark-schoology-com] .course-dashboard__accessibility-icon svg {
  display: none !important;
}

html[data-theme-hub-dark-schoology-com] ._1bqN_ {
  background-color: #cdcdcd !important;
  color: #6c6c6c !important;
}

html[data-theme-hub-dark-schoology-com] ._1bqN_:hover {
  background-color: #d3d3d3 !important;
  color: #6c6c6c !important;
}

html[data-theme-hub-dark-schoology-com] .popups-title {
  background: #f1f1f1;
  color: #302b2b;
}

html[data-theme-hub-dark-schoology-com] ._2T2dA {
  background-color: #ffffff;
}

html[data-theme-hub-dark-schoology-com] ._1EyV_ {
  color: #0d6db5 !important;
}

html[data-theme-hub-dark-schoology-com] ._9GDcm,
html[data-theme-hub-dark-schoology-com] .Header-bottom-border-2ZE-7 {
  background-color: #f3f3f3;
}

html[data-theme-hub-dark-schoology-com] .Card-card-data-17m6S {
  background: #e1e1e1 !important;
}

html[data-theme-hub-dark-schoology-com] body .submit-span-wrapper {
  color: white;
}

html[data-theme-hub-dark-schoology-com] ._2T2dA {
  background-color: white !important;
}

html[data-theme-hub-dark-schoology-com] #taught-courses-switcher .ui-selectmenu.ui-state-active,
html[data-theme-hub-dark-schoology-com] .links li.active a,
html[data-theme-hub-dark-schoology-com] .tabs.secondary li.active a,
html[data-theme-hub-dark-schoology-com] .link-btn.active,
html[data-theme-hub-dark-schoology-com] .filter-item a.active,
html[data-theme-hub-dark-schoology-com] .link-btn.active:active {
  background: #e3e3e3 !important;
  color: #000000 !important;
}

html[data-theme-hub-dark-schoology-com] .util-neon-avatar-3J4cU img {
  -webkit-user-select: none !important;
  -moz-user-select: none !important;
  -ms-user-select: none !important;
  user-select: none !important;
}

html[data-theme-hub-dark-schoology-com] .dVlNp {
  background: #e3e3e3 !important;
  color: #000000 !important;
}

html[data-theme-hub-dark-schoology-com] .dVlNp:hover {
  background: #f3f3f3 !important;
  border-color: rgb(226, 226, 226) !important;
}

html[data-theme-hub-dark-schoology-com] .has-right-col #center-inner {
  background: none !important;
}

html[data-theme-hub-dark-schoology-com] #course-materials-dropdown,
html[data-theme-hub-dark-schoology-com] #roster-wrapper .enrollment-search input {
  background-color: #d3d3d3;
  border: none;
}

html[data-theme-hub-dark-schoology-com] #roster-wrapper .enrollment-search .go-btn {
  background-color: unset !important;
}

html[data-theme-hub-dark-schoology-com] .enrollment-search .go-btn {
  height: 13px !important;
}

html[data-theme-hub-dark-schoology-com] .nav-breadcrumb-container-1732584003 {
  background-color: #848484 !important;
}

html[data-theme-hub-dark-schoology-com] .nav-breadcrumb-subContainer-4084051826:before {
  background: none !important;
}

html[data-theme-hub-dark-schoology-com] .nav-breadcrumb-bracket-3282107711 {
  color: #fff !important;
}

html[data-theme-hub-dark-schoology-com] .course-dashboard .sgy-card {
  background: #ebebeb !important;
}

html[data-theme-hub-dark-schoology-com] #main-content-wrapper,
html[data-theme-hub-dark-schoology-com] #main {
  background: #ffffff !important;
  border-radius: 7px !important;
}

html[data-theme-hub-dark-schoology-com] .has-right-col #center-top {
  background: none !important;
}

html[data-theme-hub-dark-schoology-com] .materials-filter-wrapper {
  border-radius: 7px !important;
}

html[data-theme-hub-dark-schoology-com] body:not(.is-detail-layout) #sidebar-left .active-trail a,
html[data-theme-hub-dark-schoology-com] .folder-contents-cell,
html[data-theme-hub-dark-schoology-com] .materials-top,
html[data-theme-hub-dark-schoology-com] #main-content-wrapper,
html[data-theme-hub-dark-schoology-com] #main,
html[data-theme-hub-dark-schoology-com] .roster-top,
html[data-theme-hub-dark-schoology-com] #center-top,
html[data-theme-hub-dark-schoology-com] .enrollment-user-list,
html[data-theme-hub-dark-schoology-com] .enrollment-view-nav,
html[data-theme-hub-dark-schoology-com] fieldset,
html[data-theme-hub-dark-schoology-com] #s-user-set-notifications-form th.email-notify {
  background: #f2f2f2 !important;
}

html[data-theme-hub-dark-schoology-com] .gradebook-course.hierarchical-grading-report .summary-course {
  background-color: #f7f7f7 !important;
}

html[data-theme-hub-dark-schoology-com] .link-btn {
  background: none !important;
}

html[data-theme-hub-dark-schoology-com] body ul.primary {
  background: none;
}

html[data-theme-hub-dark-schoology-com] #header>header>nav>ul>li>button,
html[data-theme-hub-dark-schoology-com] #header>header>nav>ul>li>div>button,
html[data-theme-hub-dark-schoology-com] ._24W2g,
html[data-theme-hub-dark-schoology-com] ._9GDcm,
html[data-theme-hub-dark-schoology-com] ._1Z0RM,
html[data-theme-hub-dark-schoology-com] ._3RmDr {
  background-color: #e2e2e2 !important;
}

html[data-theme-hub-dark-schoology-com] ._2T2dA,
html[data-theme-hub-dark-schoology-com] ._3_bfp {
  background-color: #cdcdcd !important;
}

html[data-theme-hub-dark-schoology-com] button .util-caret-icon-modern-1iz99 {
  color: #fff;
}

html[data-theme-hub-dark-schoology-com] .Header-bottom-border-2ZE-7 {
  filter: drop-shadow(0 0 6px rgba(0, 0, 0, .04)) drop-shadow(2px 0 8px rgba(0, 0, 0, .08));
}

html[data-theme-hub-dark-schoology-com] .S42JQ {
  background-color: #e3e3e3 !important;
}

html[data-theme-hub-dark-schoology-com] ._1YkZP,
html[data-theme-hub-dark-schoology-com] .QshRx {
  background-color: #cdcdcd !important;
}

html[data-theme-hub-dark-schoology-com] ._1YkZP {
  background-color: #d3d3d3 !important;
}

html[data-theme-hub-dark-schoology-com] .util-hover-background-color-cloud-grey-wHghL:hover {
  background-color: #e6e6e6 !important;
}

html[data-theme-hub-dark-schoology-com] .Header-bottom-border-2ZE-7,
html[data-theme-hub-dark-schoology-com] ._3v0y7 {
  border-top: 3px solid rgb(203 203 203) !important;
}

html[data-theme-hub-dark-schoology-com] ._23_WZ,
html[data-theme-hub-dark-schoology-com] #copyright,
html[data-theme-hub-dark-schoology-com] .dVlNp,
html[data-theme-hub-dark-schoology-com] ._16XsF,
html[data-theme-hub-dark-schoology-com] ._2K08O {
  border-top: none !important;
}

html[data-theme-hub-dark-schoology-com] ._26UWf,
html[data-theme-hub-dark-schoology-com] ._3RmDr {
  background-color: #cdcdcd !important;
}

html[data-theme-hub-dark-schoology-com] .util-v2-header-background-color-22JtI:hover,
html[data-theme-hub-dark-schoology-com] .L1I_b {
  background-color: #dfdfdf !important;
}

html[data-theme-hub-dark-schoology-com] #s-user-edit-calendar-feed-settings-form .submit-span-wrapper {
  background: none !important;
}

html[data-theme-hub-dark-schoology-com] .ui-selectmenu-menu .ui-selectmenu-group:hover {
  background: #eef3f8 !important;
}

html[data-theme-hub-dark-schoology-com] #edit-course-switcher-select-nid-menu .ui-selectmenu-group li:hover a {
  background: none !important;
}

html[data-theme-hub-dark-schoology-com] .course-dashboard .sgy-card:hover .sgy-card-lens:after {
  background: rgb(255 255 255 / 39%) !important;
}

html[data-theme-hub-dark-schoology-com] [data-theme="modern"] .materials-filter-wrapper .action-links .action-view-assignments a:hover,
html[data-theme-hub-dark-schoology-com] .materials-filter-wrapper .action-links a:hover {
  background-color: rgb(229 225 225 / 89%) !important;
}

html[data-theme-hub-dark-schoology-com] .materials-top,
html[data-theme-hub-dark-schoology-com] #folder-contents-table .folder-contents-cell {
  border-bottom: 1px solid #000 !important;
}

html[data-theme-hub-dark-schoology-com] .materials-filter-wrapper .action-links-wrapper .action-links-unfold {
  outline: 1px solid #000;
}

html[data-theme-hub-dark-schoology-com] .date-header h4 {
  border-top: 1px solid #000 !important;
  color: #000 !important;
}

html[data-theme-hub-dark-schoology-com] a.ui-selectmenu,
html[data-theme-hub-dark-schoology-com] .notification-settings-wrapper {
  background: #dbdbdb !important;
  border: none !important;
}

html[data-theme-hub-dark-schoology-com] #taught-courses-switcher .ui-selectmenu.ui-state-active,
html[data-theme-hub-dark-schoology-com] .link-btn.active {
  border: none !important;
  outline: 1px solid #000 !important;
}

html[data-theme-hub-dark-schoology-com] .link-btn {
  border: none !important;
}

html[data-theme-hub-dark-schoology-com] .s-rte table.s_table.s_table_border th,
html[data-theme-hub-dark-schoology-com] .s-rte table.s_table.s_table_border td {
  border: 1px solid #000 !important;
}

html[data-theme-hub-dark-schoology-com] .util-menu-row-link-2dTZi:visited,
html[data-theme-hub-dark-schoology-com] .util-menu-row-link-2dTZi {
  background-color: #cecece !important;
}

html[data-theme-hub-dark-schoology-com] .util-menu-row-link-2dTZi:hover,
html[data-theme-hub-dark-schoology-com] .util-menu-row-link-wrapper-1EJ4Z:hover {
  background-color: #eef3f8 !important;
}

html[data-theme-hub-dark-schoology-com] .materials-filter-wrapper .action-links-wrapper .action-links-unfold {
  background-color: #dbdbdb !important;
}

html[data-theme-hub-dark-schoology-com] #right-column .course-action-btns .link-btn {
  background-color: #ececec !important;
  color: black !important;
}

html[data-theme-hub-dark-schoology-com] ._31GLY:hover,
html[data-theme-hub-dark-schoology-com] #header>header>nav>ul>li>button:hover,
html[data-theme-hub-dark-schoology-com] #header>header>nav>ul>li>div>button:hover {
  background-color: #dfdfdf !important;
}

html[data-theme-hub-dark-schoology-com] .course-dashboard .sgy-card:hover .course-dashboard__administrators {
  color: orange !important;
  font-weight: 600 !important;
}

html[data-theme-hub-dark-schoology-com] .theme-2016-layout #right-column-inner > div:not(:empty),
html[data-theme-hub-dark-schoology-com] .theme-2016 #right-column-inner > div:not(:empty) {
  background: #f7f7f7 !important;
}

html[data-theme-hub-dark-schoology-com] .theme-2016-layout #right-column-inner>div:not(:empty) {
  box-shadow: 0 1px 3px 0 rgb(163 153 153 / 15%) !important;
}

html[data-theme-hub-dark-schoology-com] #multi-website-theme-label {
  position: fixed;
  bottom: 8px;
  right: 8px;
  padding: 4px 8px;
  font: 12px/1.2 system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
  background: rgba(0,0,0,.5);
  color: #fff;
  border-radius: 6px;
  z-index: 2147483647;
  pointer-events: none;
  opacity: 0.8;
  transition: opacity 0.3s ease;
}
  `
}
