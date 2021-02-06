export enum WidgetTypes {
  AgreeDisagree = "AGREE_DISAGREE",
  ChooseOne = "CHOOSE_ONE",
  ChooseMany = "CHOOSE_MANY",
  ShortAnswer = "SHORT_ANSWER",
}

export enum ThumbDirection {
  Up = "UP",
  Down = "DOWN",
}

export interface OneChoice {
  key: string;
  value: string | number;
}

interface PromptWithChoices {
  prompt: string;
  choices: OneChoice[];
}

export interface ChooseOneContent extends PromptWithChoices {
  type: WidgetTypes.ChooseOne;
}

export interface ChooseManyContent extends PromptWithChoices {
  type: WidgetTypes.ChooseMany;
}

export interface AgreeDisagreeContent {
  type: WidgetTypes.AgreeDisagree;
  prompt: string;
  upText: string;
  downText: string;
}

export interface ShortAnswerContent {
  type: WidgetTypes.ShortAnswer;
  prompt: string;
}

export type WidgetContent =
  | AgreeDisagreeContent
  | ChooseManyContent
  | ChooseOneContent
  | ShortAnswerContent;
