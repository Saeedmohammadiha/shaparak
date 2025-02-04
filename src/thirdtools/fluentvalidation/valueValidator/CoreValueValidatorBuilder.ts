import { IValidator } from '@Fluentvalidator/IValidator';
import { AsyncRule } from '@Fluentvalidator/rules/AsyncRule';
import { EmailAddressRule } from '@Fluentvalidator/rules/EmailAddressRule';
import { EqualRule } from '@Fluentvalidator/rules/EqualRule';
import { ExclusiveBetweenRule } from '@Fluentvalidator/rules/ExclusiveBetweenRule';
import { GreaterThanOrEqualToRule } from '@Fluentvalidator/rules/GreaterThanOrEqualToRule';
import { GreaterThanRule } from '@Fluentvalidator/rules/GreaterThanRule';
import { InclusiveBetweenRule } from '@Fluentvalidator/rules/InclusiveBetweenRule';
import { LengthRule } from '@Fluentvalidator/rules/LengthRule';
import { LessThanOrEqualToRule } from '@Fluentvalidator/rules/LessThanOrEqualToRule';
import { LessThanRule } from '@Fluentvalidator/rules/LessThanRule';
import { MatchesRule } from '@Fluentvalidator/rules/MatchesRule';
import { MaxLengthRule } from '@Fluentvalidator/rules/MaxLengthRule';
import { MinLengthRule } from '@Fluentvalidator/rules/MinLengthRule';
import { MustRule } from '@Fluentvalidator/rules/MustRule';
import { NotEmptyRule } from '@Fluentvalidator/rules/NotEmptyRule';
import { NotEqualRule } from '@Fluentvalidator/rules/NotEqualRule';
import { NotNullRule } from '@Fluentvalidator/rules/NotNullRule';
import { NullRule } from '@Fluentvalidator/rules/NullRule';
import { Rule } from '@Fluentvalidator/rules/Rule';
import { ScalePrecisionRule } from '@Fluentvalidator/rules/ScalePrecisionRule';
import { ValidatorRule } from '@Fluentvalidator/rules/ValidatorRule';
import { ValueTransformer } from './ValueTransformer';

export abstract class CoreValueValidatorBuilder<TModel, TValue, TTransformedValue> {
	protected rules: Array<{
		isAsync: boolean;
		rule: Rule<TModel, TTransformedValue> | AsyncRule<TModel, TTransformedValue>;
	}> = [];

	private rebuildValidate: () => void;

	protected transformValue: ValueTransformer<TValue, TTransformedValue>;

	constructor(rebuildValidate: () => void, transformValue: ValueTransformer<TValue, TTransformedValue>) {
		this.rebuildValidate = rebuildValidate;
		this.transformValue = transformValue;
	}

	protected pushRule = (rule: Rule<TModel, TTransformedValue>) => {
		this.rules.push({ isAsync: false, rule });
		this.rebuildValidate();
	};

	protected pushAsyncRule = (rule: AsyncRule<TModel, TTransformedValue>) => {
		this.rules.push({ isAsync: true, rule });
		this.rebuildValidate();
	};

	public withMessage = (message: string) => {
		const latestRule = this.getLatestRule();
		latestRule.rule.setCustomErrorMessage(message);

		this.rebuildValidate();

		return {
			...this.getAllRules(),
			when: this.when,
			unless: this.unless
		};
	};

	public when = (
		condition: (model: TModel) => boolean,
		appliesTo: 'AppliesToAllValidators' | 'AppliesToCurrentValidator' = 'AppliesToAllValidators'
	) => {
		if (appliesTo === 'AppliesToAllValidators') {
			for (const rule of this.rules) {
				rule.rule.setWhenCondition(condition);
			}
		} else {
			const latestRule = this.getLatestRule();
			latestRule.rule.setWhenCondition(condition);
		}
		this.rebuildValidate();
		return this.getAllRules();
	};

	public unless = (
		condition: (model: TModel) => boolean,
		appliesTo: 'AppliesToAllValidators' | 'AppliesToCurrentValidator' = 'AppliesToAllValidators'
	) => {
		if (appliesTo === 'AppliesToAllValidators') {
			for (const rule of this.rules) {
				rule.rule.setUnlessCondition(condition);
			}
		} else {
			const latestRule = this.getLatestRule();
			latestRule.rule.setUnlessCondition(condition);
		}
		this.rebuildValidate();
		return this.getAllRules();
	};

	public notEqual = (forbiddenValue: TTransformedValue) => {
		const notEqualRule = new NotEqualRule<TModel, TTransformedValue>(forbiddenValue);
		this.pushRule(notEqualRule);
		return this.getAllRulesAndExtensions();
	};

	public equal = (requiredValue: TTransformedValue) => {
		const equalRule = new EqualRule<TModel, TTransformedValue>(requiredValue);
		this.pushRule(equalRule);
		return this.getAllRulesAndExtensions();
	};

	public must = (
		definition:
			| ((value: TTransformedValue, model: TModel) => boolean)
			| {
					predicate: (value: TTransformedValue, model: TModel) => boolean;
					message: string | ((value: TTransformedValue, model: TModel) => string);
			  }
			| Array<
					| ((value: TTransformedValue, model: TModel) => boolean)
					| {
							predicate: (value: TTransformedValue, model: TModel) => boolean;
							message: string | ((value: TTransformedValue, model: TModel) => string);
					  }
			  >
	) => {
		const mustRule = new MustRule<TModel, TTransformedValue>(definition);
		this.pushRule(mustRule);
		return this.getAllRulesAndExtensions();
	};

	public notNull = () => {
		const notNullRule = new NotNullRule<TModel, TTransformedValue>();
		this.pushRule(notNullRule);
		return this.getAllRulesAndExtensions();
	};

	public null = () => {
		const nullRule = new NullRule<TModel, TTransformedValue>();
		this.pushRule(nullRule);
		return this.getAllRulesAndExtensions();
	};

	public notEmpty = () => {
		const notEmptyRule = new NotEmptyRule<TModel, TTransformedValue>();
		this.pushRule(notEmptyRule);
		return this.getAllRulesAndExtensions();
	};

	public length = (minLength: number, maxLength: number) => {
		const lengthRule = new LengthRule<TModel, TTransformedValue>(minLength, maxLength);
		this.pushRule(lengthRule);
		return this.getAllRulesAndExtensions();
	};

	public maxLength = (maxLength: number) => {
		const maxLengthRule = new MaxLengthRule<TModel, TTransformedValue>(maxLength);
		this.pushRule(maxLengthRule);
		return this.getAllRulesAndExtensions();
	};

	public minLength = (minLength: number) => {
		const minLengthRule = new MinLengthRule<TModel, TTransformedValue>(minLength);
		this.pushRule(minLengthRule);
		return this.getAllRulesAndExtensions();
	};

	public matches = (pattern: RegExp) => {
		const matchesRule = new MatchesRule<TModel, TTransformedValue>(pattern);
		this.pushRule(matchesRule);
		return this.getAllRulesAndExtensions();
	};

	public emailAddress = () => {
		const emailAddressRule = new EmailAddressRule<TModel, TTransformedValue>();
		this.pushRule(emailAddressRule);
		return this.getAllRulesAndExtensions();
	};

	public lessThan = (threshold: number) => {
		const lessThanRule = new LessThanRule<TModel, TTransformedValue>(threshold);
		this.pushRule(lessThanRule);
		return this.getAllRulesAndExtensions();
	};

	public lessThanOrEqualTo = (threshold: number) => {
		const lessThanOrEqualToRule = new LessThanOrEqualToRule<TModel, TTransformedValue>(threshold);
		this.pushRule(lessThanOrEqualToRule);
		return this.getAllRulesAndExtensions();
	};

	public greaterThan = (threshold: number) => {
		const greaterThanRule = new GreaterThanRule<TModel, TTransformedValue>(threshold);
		this.pushRule(greaterThanRule);
		return this.getAllRulesAndExtensions();
	};

	public greaterThanOrEqualTo = (threshold: number) => {
		const greaterThanOrEqualToRule = new GreaterThanOrEqualToRule<TModel, TTransformedValue>(threshold);
		this.pushRule(greaterThanOrEqualToRule);
		return this.getAllRulesAndExtensions();
	};

	public exclusiveBetween = (lowerBound: number, upperBound: number) => {
		const exclusiveBetweenRule = new ExclusiveBetweenRule<TModel, TTransformedValue>(lowerBound, upperBound);
		this.pushRule(exclusiveBetweenRule);
		return this.getAllRulesAndExtensions();
	};

	public inclusiveBetween = (lowerBound: number, upperBound: number) => {
		const inclusiveBetweenRule = new InclusiveBetweenRule<TModel, TTransformedValue>(lowerBound, upperBound);
		this.pushRule(inclusiveBetweenRule);
		return this.getAllRulesAndExtensions();
	};

	public setValidator = (validatorProducer: (model: TModel) => IValidator<TTransformedValue>) => {
		const validatorRule = new ValidatorRule<TModel, TTransformedValue>(
			validatorProducer as (model: TModel) => IValidator<TTransformedValue>
		);
		this.pushRule(validatorRule);
		return this.getAllRulesAndExtensions();
	};

	public scalePrecision = (precision: number, scale: number) => {
		if (scale - precision <= 0) {
			throw new Error('Invalid scale and precision were passed to the scalePrecision rule');
		}
		const scalePrecisionRule = new ScalePrecisionRule<TModel, TTransformedValue>(precision, scale);
		this.pushRule(scalePrecisionRule);
		return this.getAllRulesAndExtensions();
	};

	protected _getAllRules = () => {
		return {
			notEqual: this.notEqual,
			equal: this.equal,
			must: this.must,
			notNull: this.notNull,
			null: this.null,
			notEmpty: this.notEmpty,
			length: this.length,
			maxLength: this.maxLength,
			minLength: this.minLength,
			matches: this.matches,
			emailAddress: this.emailAddress,
			lessThan: this.lessThan,
			lessThanOrEqualTo: this.lessThanOrEqualTo,
			greaterThan: this.greaterThan,
			greaterThanOrEqualTo: this.greaterThanOrEqualTo,
			exclusiveBetween: this.exclusiveBetween,
			inclusiveBetween: this.inclusiveBetween,
			setValidator: this.setValidator,
			scalePrecision: this.scalePrecision
		};
	};

	// We don't care about code coverage for this line
	// istanbul ignore next
	public getAllRules = (): object => {
		throw new Error('getAllRules on CoreValueValidatorBuilder is an abstract method and should never be called');
	};

	public getAllRulesAndExtensions = () => {
		return {
			...this.getAllRules(),
			withMessage: this.withMessage,
			when: this.when,
			unless: this.unless
		};
	};

	private getLatestRule = () => {
		return this.rules[this.rules.length - 1];
	};
}
