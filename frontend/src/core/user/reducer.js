/* @flow */

import { UPDATE, UPDATE_SETTINGS } from './actions';

import type { UpdateAction, UpdateSettingsAction } from './actions';


type Action =
    | UpdateAction
    | UpdateSettingsAction
;


export type SettingsState = {|
    +runQualityChecks: boolean,
    +forceSuggestions: boolean,
|};

const initialSettings: SettingsState = {
    runQualityChecks: true,
    forceSuggestions: true,
};

function settings(
    state: SettingsState = initialSettings,
    action: Action,
): SettingsState {
    switch (action.type) {
        case UPDATE:
            if (!action.data.settings) {
                return state;
            }
            return {
                runQualityChecks: action.data.settings.quality_checks,
                forceSuggestions: action.data.settings.force_suggestions,
            };
        case UPDATE_SETTINGS:
            return {
                ...state,
                ...action.settings,
            };
        default:
            return state;
    }
}


export type UserState = {|
    +isAuthenticated: boolean,
    +isAdmin: boolean,
    +id: string,
    +displayName: string,
    +nameOrEmail: string,
    +email: string,
    +username: string,
    +managerForLocales: Array<string>,
    +translatorForLocales: Array<string>,
    +translatorForProjects: { [string]: boolean },
    +settings: SettingsState,
    +preferredLocales: Array<string>,
    +signInURL: string,
    +signOutURL: string,
    +gravatarURLSmall: string,
    +gravatarURLBig: string,
|};

const initial: UserState = {
    isAuthenticated: false,
    isAdmin: false,
    id: '',
    displayName: '',
    nameOrEmail: '',
    email: '',
    username: '',
    managerForLocales: [],
    translatorForLocales: [],
    translatorForProjects: {},
    settings: initialSettings,
    preferredLocales: [],
    signInURL: '',
    signOutURL: '',
    gravatarURLSmall: '',
    gravatarURLBig: '',
};

export default function reducer(
    state: UserState = initial,
    action: Action,
): UserState {
    switch (action.type) {
        case UPDATE:
            return {
                isAuthenticated: action.data.is_authenticated,
                isAdmin: action.data.is_admin,
                id: action.data.id,
                displayName: action.data.display_name,
                nameOrEmail: action.data.name_or_email,
                email: action.data.email,
                username: action.data.username,
                managerForLocales: action.data.manager_for_locales,
                translatorForLocales: action.data.translator_for_locales,
                translatorForProjects: action.data.translator_for_projects,
                settings: settings(state.settings, action),
                preferredLocales: action.data.preferred_locales,
                signInURL: action.data.login_url,
                signOutURL: action.data.logout_url,
                gravatarURLSmall: action.data.gravatar_url_small,
                gravatarURLBig: action.data.gravatar_url_big,
            };
        case UPDATE_SETTINGS:
            return {
                ...state,
                settings: settings(state.settings, action),
            };
        default:
            return state;
    }
}
