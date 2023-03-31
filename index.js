(function () {
  'use strict';

  var ButtonState;
  (function (ButtonState) {
    ButtonState["HIDDEN"] = "hidden";
    ButtonState["AVAILABLE"] = "available";
    ButtonState["ACTIVATED"] = "activated";
  })(ButtonState || (ButtonState = {}));
  var CssClassName;
  (function (CssClassName) {
    CssClassName["HIDING_TEXT"] = "hiding-text";
  })(CssClassName || (CssClassName = {}));

  var CommonWaitState;
  (function (CommonWaitState) {
    // This state usually quickly changes to another.
    // However, for streams it may stay up to several seconds.
    CommonWaitState["PROCESSING"] = "processing";
  })(CommonWaitState || (CommonWaitState = {}));
  var VideoSpecificWaitState;
  (function (VideoSpecificWaitState) {
    VideoSpecificWaitState["IN_QUEUE"] = "in_queue";
  })(VideoSpecificWaitState || (VideoSpecificWaitState = {}));
  var StreamSpecificWaitState;
  (function (StreamSpecificWaitState) {
    // Should show processing immediately
    StreamSpecificWaitState["FORCED_PROCESSING"] = "forced_processing";
  })(StreamSpecificWaitState || (StreamSpecificWaitState = {}));
  Object.freeze(Object.assign(Object.assign({}, CommonWaitState), VideoSpecificWaitState));
  Object.freeze(Object.assign(Object.assign({}, CommonWaitState), StreamSpecificWaitState));
  const WaitState = Object.freeze(Object.assign(Object.assign(Object.assign({}, CommonWaitState), VideoSpecificWaitState), StreamSpecificWaitState));
  var StreamState;
  (function (StreamState) {
    StreamState["STREAM_AVAILABLE"] = "stream_available";
  })(StreamState || (StreamState = {}));
  // exported to iOS native
  // so keys should match with real native states
  const TranslationButtonState = Object.freeze(Object.assign(Object.assign(Object.assign({}, ButtonState), WaitState), StreamState));
  var TranslationStateChangeCssVar;
  (function (TranslationStateChangeCssVar) {
    TranslationStateChangeCssVar["TRANSLATION_LABEL_WIDTH"] = "--translation-label-width";
  })(TranslationStateChangeCssVar || (TranslationStateChangeCssVar = {}));
  var TranslationProgress;
  (function (TranslationProgress) {
    TranslationProgress["N_MINUTES"] = "n_minutes";
    TranslationProgress["MORE_THAN_HOUR"] = "more_than_hour";
  })(TranslationProgress || (TranslationProgress = {}));

  const normalizeLocale = (str) => {
    const localeRaw = str.toLowerCase();
    const sectionParts = localeRaw.split(';');
    const localeFull = sectionParts[0].trim();
    return localeFull.split(/-|_/)[0];
  };

  const DEFAULT_LOCALE = 'en';
  const getLocaleBase = () => {
    var _a, _b, _c, _d;
    const api = (_b = (_a = window.yandex) === null || _a === void 0 ? void 0 : _a.i18n) !== null && _b !== void 0 ? _b : (_c = window.chrome) === null || _c === void 0 ? void 0 : _c.i18n;
    const localeMain = ((_d = api === null || api === void 0 ? void 0 : api.getUILanguage) === null || _d === void 0 ? void 0 : _d.call(api)) || navigator.language;
    if (!localeMain) {
      return DEFAULT_LOCALE;
    }
    return normalizeLocale(localeMain);
  };
  const getLocale = (stringMaps) => {
    const locale = normalizeLocale(navigator.language) === 'id' ? 'id' :
      getLocaleBase();
    window.getLocale__locale1 = locale;
    for (const stringMap of stringMaps) {
      if (!stringMap.has(locale)) {
        window.getLocale__returnDEFAULT_LOCALE = true;
        return DEFAULT_LOCALE;
      }
    }
    return locale;
  };

  const translationLabelLanguageMap = new Map([
    ['ru', Object.freeze({
      [TranslationButtonState.HIDDEN]: '',
      [TranslationButtonState.AVAILABLE]: 'Перевести видео',
      [TranslationButtonState.STREAM_AVAILABLE]: 'Перевести трансляцию',
      [TranslationButtonState.FORCED_PROCESSING]: 'Переводится',
      [TranslationButtonState.PROCESSING]: 'Переводится',
      [TranslationButtonState.ACTIVATED]: 'Выключить',
      [TranslationButtonState.IN_QUEUE]: 'Переводится',
    })],
    ['en', Object.freeze({
      [TranslationButtonState.HIDDEN]: '',
      [TranslationButtonState.AVAILABLE]: 'Translate',
      [TranslationButtonState.STREAM_AVAILABLE]: 'Translate stream',
      [TranslationButtonState.FORCED_PROCESSING]: 'Translating',
      [TranslationButtonState.PROCESSING]: 'Translating',
      [TranslationButtonState.ACTIVATED]: 'Disable',
      [TranslationButtonState.IN_QUEUE]: 'Time remaining',
    })],
    ['kk', Object.freeze({
      [TranslationButtonState.HIDDEN]: '',
      [TranslationButtonState.AVAILABLE]: 'Видеоны аудару',
      [TranslationButtonState.STREAM_AVAILABLE]: 'Трансляцияны аудару',
      [TranslationButtonState.FORCED_PROCESSING]: 'Аударылып жатыр',
      [TranslationButtonState.PROCESSING]: 'Аударылып жатыр',
      [TranslationButtonState.ACTIVATED]: 'Өшіру',
      [TranslationButtonState.IN_QUEUE]: 'Аударылуда',
    })],
    ['uk', Object.freeze({
      [TranslationButtonState.HIDDEN]: '',
      [TranslationButtonState.AVAILABLE]: 'Перекласти відео',
      [TranslationButtonState.STREAM_AVAILABLE]: 'Перекласти трансляцію',
      [TranslationButtonState.FORCED_PROCESSING]: 'Перекладається',
      [TranslationButtonState.PROCESSING]: 'Перекладається',
      [TranslationButtonState.ACTIVATED]: 'Вимкнути',
      [TranslationButtonState.IN_QUEUE]: 'Перекладається',
    })],
    ['id', Object.freeze({
      [TranslationButtonState.HIDDEN]: '',
      [TranslationButtonState.AVAILABLE]: 'Terjemahkan video',
      [TranslationButtonState.STREAM_AVAILABLE]: 'Terjemahkan stream',
      [TranslationButtonState.FORCED_PROCESSING]: 'Menerjemahkan',
      [TranslationButtonState.PROCESSING]: 'Menerjemahkan',
      [TranslationButtonState.ACTIVATED]: 'Nonaktifkan',
      [TranslationButtonState.IN_QUEUE]: 'Menerjemahkan',
    })],
  ]);
  const labelProgressLanguageMap = new Map([
    ['ru', Object.freeze({
      [TranslationProgress.N_MINUTES]: (minutes) => `: еще ${minutes} мин`,
      [TranslationProgress.MORE_THAN_HOUR]: ': больше часа',
    })],
    ['en', Object.freeze({
      [TranslationProgress.N_MINUTES]: (minutes) => `: ${minutes} min`,
      [TranslationProgress.MORE_THAN_HOUR]: ': over an hour',
    })],
    ['kk', Object.freeze({
      [TranslationProgress.N_MINUTES]: (minutes) => `: тағы ${minutes} мин`,
      [TranslationProgress.MORE_THAN_HOUR]: ': бір сағаттан көп',
    })],
    ['uk', Object.freeze({
      [TranslationProgress.N_MINUTES]: (minutes) => `: ще ${minutes} хв`,
      [TranslationProgress.MORE_THAN_HOUR]: ': більше години',
    })],
    ['id', Object.freeze({
      [TranslationProgress.N_MINUTES]: (minutes) => `: ${minutes} menit`,
      [TranslationProgress.MORE_THAN_HOUR]: ': lebih dari satu jam',
    })],
  ]);
  const locale = getLocale([
    translationLabelLanguageMap,
    labelProgressLanguageMap,
  ]);
  const TranslationLabelText = translationLabelLanguageMap.get(locale);
  labelProgressLanguageMap.get(locale);

  var _a, _b, _c, _d, _e, _f;
  const translationLabelText = TranslationLabelText[TranslationButtonState.AVAILABLE];
  const outputRaw = `
window.yandex?.i18n?.getUILanguage?.() = ${(_c = (_b = (_a = window.yandex) === null || _a === void 0 ? void 0 : _a.i18n) === null || _b === void 0 ? void 0 : _b.getUILanguage) === null || _c === void 0 ? void 0 : _c.call(_b)}
window.chrome?.i18n?.getUILanguage?.() = ${(_f = (_e = (_d = window.chrome) === null || _d === void 0 ? void 0 : _d.i18n) === null || _e === void 0 ? void 0 : _e.getUILanguage) === null || _f === void 0 ? void 0 : _f.call(_e)}
navigator.language = ${navigator.language}
navigator.languages = ${navigator.languages}

getLocale__locale1 = ${window.getLocale__locale1}
getLocale__returnDEFAULT_LOCALE = ${window.getLocale__returnDEFAULT_LOCALE}
locale = ${locale}
translationLabelText = ${translationLabelText}
`;
  const output = outputRaw
    .slice(1, -1)
    .split('\n')
    .map((str) => `${str}<br>`)
    .join('\n');
  document.write(output);

}());
