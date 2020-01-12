// import { $, $$ } from './modules/bling';
// import autocomplete from './modules/autocomplete';
// import typeAhead from './modules/typeAhead';
// import makeMap from './modules/map';

// autocomplete($('#address'), $('#lat'), $('#lng'));

// typeAhead($('.search'));

// makeMap($('#map'));

import $ from 'jquery';
import 'select2';
import flatpickr from 'flatpickr';
import Dialog from './Dialog';

// globally set ajax caching to false
$.ajaxSetup({
	cache: false
});

// setup multiselects
$('.js-select2').select2();

// setup date pickers
// disables today and future dates for restricting orders
flatpickr('.js-datepicker-range.js-disable-future:not(.flatpickr-input)', {
	mode: 'range',
	disable: [
		function(date) {
			const today = new Date().setHours(0, 0, 0, 0);
			return date >= today;
		}
	]
});
// disables today and past dates for restricting send dates
flatpickr('.js-datepicker.js-disable-past:not(.flatpickr-input)', {
	disable: [
		function(date) {
			const today = new Date().setHours(0, 0, 0, 0);
			return date <= today;
		}
	]
});
// setup general date pickers
flatpickr('.js-datepicker-range:not(.flatpickr-input)', { mode: 'range' });
flatpickr('.js-datepicker:not(.flatpickr-input)');

// setup dialogs
var dialogs = [];
$('.js-dialog').each(function(i) {
	dialogs[i] = new Dialog($(this));
});

$(document).ready(function() {
	// tinymce is defined in separate script tag and must be added once the document is loaded
	$('.js-tinymce-editor').each(function() {
		const selector = '#' + $(this).attr('id');
		let options = {};
		if ($(this).attr('data-tinymce-small') === 'Y') {
			options = {
				selector,
				// Manage Plugins
				plugins: ['paste', 'autoresize'],
				target_list: false,
				link_title: false,
				autoresize_bottom_margin: 0,
				force_p_newlines: false,
				forced_root_block: '',
				// Configure editing options
				toolbar: 'bold italic',
				// Setup Editor Appearance
				theme: 'modern',
				mobile: {
					theme: 'mobile',
					toolbar: 'bold italic'
				},
				skin: 'lightgray',
				branding: false,
				elementpath: false,
				menubar: false,
				statusbar: false,
				resize: false
			};
		} else {
			options = {
				selector,
				// Manage Plugins
				plugins: ['paste', 'link', 'autoresize', 'hr', 'lists', 'code'],
				target_list: false,
				link_title: false,
				autoresize_bottom_margin: 10,
				// Configure editing options
				toolbar: 'bold italic hr | bullist numlist | link | code',
				// Setup Editor Appearance
				theme: 'modern',
				mobile: {
					theme: 'mobile',
					toolbar: 'bold italic hr | bullist numlist | link'
				},
				skin: 'lightgray',
				branding: false,
				elementpath: false,
				menubar: false,
				statusbar: false,
				resize: false
			};
		}
		tinymce.init(options); // eslint-disable-line no-undef
	});
});

// custom file upload button, show filename user specified
$('.js-upload-input').on('change', function() {
	var uploadedFilename = $(this)[0].files[0].name;
	$(this)
		.closest('.js-upload')
		.find('.js-upload-path')
		.text(uploadedFilename);
});

// setup mobile toggle of site nav
const $toggleMenu = $('#js-menu-toggle');
const $siteNav = $('#js-site-nav');

$toggleMenu.on('click', () => {
	const menuExpanded = $toggleMenu.attr('aria-expanded');
	if (menuExpanded === 'true') {
		$toggleMenu.attr('aria-expanded', 'false');
		$siteNav.removeClass('is-open');
	} else {
		$toggleMenu.attr('aria-expanded', 'true');
		$siteNav.addClass('is-open');
	}
});

function howFarToOffsetScroll() {
	var mq = window.matchMedia('(min-width: 60em)');
	if (mq.matches) {
		return 150;
	}
	return 40;
}

// simple <a> animated scroll to area
// (assumes <a href="#idOfSectionToScrollTo">)
$('.js-scroll-to-link').on('click', function(e) {
	var scrollY = $($(this).attr('href')).offset().top - howFarToOffsetScroll();
	$('html, body').animate(
		{
			scrollTop: scrollY
		},
		800
	);
	e.preventDefault();
});

// Utilities for hiding/showing panels
// ---------------------------

// show hidden panel
$('.js-reveal-hidden-panel-link').on('click', function(e) {
	$(this).hide();
	var $panel = $($(this).attr('href'));
	$panel.removeClass('is-hidden').addClass('is-visible animated animated--bounceInDown');
	if ($(this).attr('data-do-not-scroll') !== 'Y') {
		var idToGoTo = $(this).attr('href');
		var scrollY = $(idToGoTo).offset().top - howFarToOffsetScroll();
		$('html, body').animate(
			{
				scrollTop: scrollY
			},
			800
		);
	}
	e.preventDefault();
});

// toggle link
$('body').on('click', '.js-toggle-link', function(e) {
	var $panel = $($(this).attr('href'));
	if (!$(this).hasClass('is-expanded')) {
		$panel.removeClass('is-hidden').addClass('is-visible animated animated--bounceInDown');
		$(this).addClass('is-expanded');
	} else {
		$panel.addClass('is-hidden').removeClass('is-visible animated animated--bounceInDown');
		$(this).removeClass('is-expanded');
	}
	e.preventDefault();
});

// Drowdown List Button
// ---------------------------
$('.js-dropdown-button-arrow').on('click', function(e) {
	var $button = $($(this)).closest('.js-dropdown-button');
	$button.toggleClass('is-open');
	e.preventDefault();
});

// Switcher Tabs
// ---------------------------
// The button shows a pane of items
$('.js-switcher-button').on('click', function(e) {
	var $switcher = $($(this)).closest('.js-switcher');
	$switcher.toggleClass('is-open');

	e.preventDefault();
});

// hide switcher content divs, show the currently selected content div
$($('.js-switcher-link.is-selected').attr('href')).addClass('is-showing');

// when click link, change switcher button, change which content is showing
$('.js-switcher-link').on('click', function(e) {
	var $switcher = $($(this)).closest('.js-switcher');

	// hide current show
	$switcher.find('.js-switcher-content.is-showing').removeClass('is-showing');

	//changed which link is selected, show content area
	$switcher.find('.js-switcher-link').removeClass('is-selected');
	$(this).addClass('is-selected');
	var $contentToReveal = $($(this).attr('href'));
	$contentToReveal.addClass('is-showing');

	// update button text, close list
	$switcher.find('.js-switcher-button').html($(this).html());
	$switcher.removeClass('is-open');
	e.preventDefault();
});
