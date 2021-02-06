export enum WidgetNames {
  ThumbsUpDown = "ThumbsUpDown",
  ChooseOne = "ChooseOne",
  ChooseMany = "ChooseMany",
  ShortAnswer = "ShortAnswer",
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
  widgetName: WidgetNames.ChooseOne;
}

export interface ChooseManyContent extends PromptWithChoices {
  widgetName: WidgetNames.ChooseMany;
}

export interface ThumbsUpDownContent {
  widgetName: WidgetNames.ThumbsUpDown;
  prompt: string;
  upText: string;
  downText: string;
}

export interface ShortAnswerContent {
  widgetName: WidgetNames.ShortAnswer;
  prompt: string;
}

export type WidgetContent =
  | ThumbsUpDownContent
  | ChooseManyContent
  | ChooseOneContent
  | ShortAnswerContent;
