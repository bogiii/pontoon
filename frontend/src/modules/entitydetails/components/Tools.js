/* @flow */

import * as React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import './Tools.css';

import api from 'core/api';

import { History } from 'modules/history';
import { Machinery, MachineryCount } from 'modules/machinery';
import { OtherLocales, OtherLocalesCount } from 'modules/otherlocales';

import type { DbEntity } from 'modules/entitieslist';
import type { Locale } from 'core/locales';
import type { NavigationParams } from 'core/navigation';
import type { UserState } from 'core/user';
import type { HistoryState } from 'modules/history';
import type { MachineryState } from 'modules/machinery';
import type { LocalesState } from 'modules/otherlocales';


type Props = {|
    entity: DbEntity,
    history: HistoryState,
    isTranslator: boolean,
    locale: Locale,
    machinery: MachineryState,
    otherlocales: LocalesState,
    orderedOtherLocales: Array<api.types.OtherLocaleTranslation>,
    preferredLocalesCount: number,
    parameters: NavigationParams,
    user: UserState,
    deleteTranslation: (number) => void,
    updateEditorTranslation: (string) => void,
    updateTranslationStatus: (number, string) => void,
|};


/**
 * Component showing details about an entity.
 *
 * Shows the metadata of the entity and an editor for translations.
 */
export default class Tools extends React.Component<Props> {
    render() {
        const {
            entity,
            history,
            isTranslator,
            locale,
            machinery,
            otherlocales,
            orderedOtherLocales,
            preferredLocalesCount,
            parameters,
            user,
            deleteTranslation,
            updateEditorTranslation,
            updateTranslationStatus,
        } = this.props;

        const historyCount = history.translations.length;
        const machineryCount = machinery.translations.length;
        const otherlocalesCount = otherlocales.translations.length;

        return <Tabs>
            <TabList>
                <Tab>
                    History
                    { !historyCount ? null :
                    <span className={ 'count' }>{ historyCount }</span>
                    }
                </Tab>
                <Tab>
                    Machinery
                    { !machineryCount ? null :
                    <MachineryCount machinery={ machinery } />
                    }
                </Tab>
                <Tab>
                    Locales
                    { !otherlocalesCount ? null :
                    <OtherLocalesCount
                        otherlocales={ otherlocales }
                        preferredLocalesCount={ preferredLocalesCount }
                    />
                    }
                </Tab>
            </TabList>

            <TabPanel>
                <History
                    history={ history }
                    isTranslator={ isTranslator }
                    locale={ locale }
                    user={ user }
                    deleteTranslation={ deleteTranslation }
                    updateTranslationStatus={ updateTranslationStatus }
                    updateEditorTranslation={ updateEditorTranslation }
                />
            </TabPanel>
            <TabPanel>
                <Machinery
                    entity={ entity }
                    locale={ locale }
                    machinery={ machinery }
                    updateEditorTranslation={ updateEditorTranslation }
                />
            </TabPanel>
            <TabPanel>
                <OtherLocales
                    otherlocales={ otherlocales }
                    orderedOtherLocales= { orderedOtherLocales }
                    preferredLocalesCount={ preferredLocalesCount }
                    user={ user }
                    parameters={ parameters }
                    updateEditorTranslation={ updateEditorTranslation }
                />
            </TabPanel>
        </Tabs>;
    }
}
