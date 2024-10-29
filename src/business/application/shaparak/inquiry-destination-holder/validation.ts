import fluentValidator from '@Fluentvalidator/attributes/validate.attribute';
import { Validator } from '@Fluentvalidator/index';
import i18next from 'i18n';
import { InquiryDestinationCommand } from 'main';

@fluentValidator(InquiryDestinationCommand)
export class InquiryDestinationValidator extends Validator<InquiryDestinationCommand> {
	constructor() {
		super();
		this.ruleFor('amount').notNull().withMessage(i18next.t('enterAmount'));
		this.ruleFor('cardIndex').notNull().withMessage(i18next.t('selectCard'));
		this.ruleFor('destinationCardNo').notNull().withMessage(i18next.t('selectCard'));
	}
}
