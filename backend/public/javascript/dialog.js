import $ from 'jquery';

// setup dialog modal
// adapted from https://bitsofco.de/accessible-modal-dialog/
class Dialog {
	constructor($dialog) {
		this.$dialog = $dialog;
		var dialog = this;
		this.lastFocusedBeforeDialog = undefined;
		this.$dialog.attr('aria-hidden', 'true');

		this.$dialogFocusableItems = this.$dialog.find(
			'button, a, input[type="checkbox"], input[type="email"], input[type="text"], input[type="tel"], input[type="submit"]'
		);

		this.$dialogFirstFocusableEl = this.$dialogFocusableItems.first();
		this.$dialogLastFocusableEl = this.$dialogFocusableItems.last();

		this.$dialog.find('.js-close-dialog').on('click', function() {
			dialog.close();
		});
		this.$dialog.on('click', function(e) {
			if (e.target == this) {
				dialog.close();
			}
		});
		this.$dialog.on('keydown', function(e) {
			dialog._handleKeyDown(e);
		});
		$('button[data-dialog-id=' + this.$dialog.attr('id') + ']').on('click', function() {
			dialog.open();
		});
	}

	open() {
		// save last focused element
		this.lastFocusedBeforeDialog = document.activeElement;

		// show dialog
		this.$dialog.attr('aria-hidden', 'false');

		$('html').addClass('has-dialog');

		// on open, set focus on first input
		this.$dialog
			.find('h2')
			.first()
			.focus();

		this.$dialog.scrollTop(0);

		// tell the world what dialog opened
		$(document).trigger('dialogopened', [this.$dialog.attr('id')]);
	}

	close() {
		// hide dialog
		this.$dialog.attr('aria-hidden', 'true');

		// set focus back to last focused element
		this.lastFocusedBeforeDialog.focus();

		$('html').removeClass('has-dialog');

		// tell the world what dialog opened
		$(document).trigger('dialogclosed', [this.$dialog.attr('id')]);
	}

	// trap tabbing within mobdal
	_handleKeyDown(e) {
		var Dialog = this;
		var KEY_TAB = 9;
		var KEY_ESC = 27;

		function handleBackwardTab() {
			if (document.activeElement === Dialog.$dialogFirstFocusableEl[0]) {
				e.preventDefault();
				Dialog.$dialogFirstFocusableEl.focus();
			}
		}
		function handleForwardTab() {
			if (document.activeElement === Dialog.$dialogLastFocusableEl[0]) {
				e.preventDefault();
				Dialog.$dialogLastFocusableEl.focus();
			}
		}

		switch (e.keyCode) {
			case KEY_TAB:
				if (this.$dialogFocusableItems.length === 1) {
					e.preventDefault();
					break;
				}
				if (e.shiftKey) {
					handleBackwardTab();
				} else {
					handleForwardTab();
				}
				break;

			case KEY_ESC:
				this.close();
				break;

			default:
				break;
		}
	}
}

export default Dialog;
