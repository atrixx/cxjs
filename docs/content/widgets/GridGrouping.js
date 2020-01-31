import { Controller } from 'cx/ui';
import { Format } from 'cx/util';
import { Grid } from 'cx/widgets';
import plural from 'plural';
import { CodeSnippet } from '../../components/CodeSnippet';
import { CodeSplit } from '../../components/CodeSplit';
import { Md } from '../../components/Md';
import { casual } from '../examples/data/casual';


class PageController extends Controller {
    onInit() {
        //init grid data
        this.store.set('$page.records', Array.from({length: 100}).map((v, i) => ({
            id: i + 1,
            fullName: casual.full_name,
            continent: casual.continent,
            browser: casual.browser,
            os: casual.operating_system,
            visits: casual.integer(1, 100)
        })));
    }
}

export const GridGrouping = <cx>
    <Md controller={PageController}>
        <CodeSplit>
            # Grouping

            An example of a grid control with grouping.

            <Grid
                records-bind='$page.records'
                scrollable
                fixedFooter
                style={{width: "100%", height: '800px'}}
                grouping={[
                    { showFooter: true },
                    {
                        key: {
                            name: {bind: '$record.continent'}
                        },
                        showCaption: true
                    }
                ]}
                columns={[{
                    header: 'Name',
                    field: 'fullName',
                    sortable: true,
                    aggregate: 'count',
                    aggregateAlias: 'people',
                    footer: {tpl: '{$group.name|TOTAL} - {$group.people} {$group.people:plural;person}'},
                    caption: {tpl: '{$group.name} ({$group.people} {$group.people:plural;person})'}
                },
                {
                    header: 'Continent',
                    field: 'continent',
                    visible: true,
                    sortable: true,
                    aggregate: 'distinct',
                    footer: {tpl: '{$group.continent} {$group.continent:plural;continent}'},
                    caption: {tpl: '{$group.continent} {$group.continent:plural;continent}'},
                },
                {
                    header: 'Browser',
                    field: 'browser',
                    sortable: true,
                    aggregate: 'distinct',
                    footer: {tpl: '{$group.browser} {$group.browser:plural;browser}'},
                    caption: {tpl: '{$group.browser} {$group.browser:plural;browser}'}
                },
                {
                    header: 'OS',
                    field: 'os',
                    sortable: true,
                    aggregate: 'distinct',
                    footer: {tpl: '{$group.os} {$group.os:plural;OS}'},
                    caption: {tpl: '{$group.os} {$group.os:plural;OS}'}
                },
                {
                    header: 'Visits',
                    field: 'visits',
                    sortable: true,
                    aggregate: "sum",
                    align: "right",
                    format: 'n;0'
                }]}
            />

            <CodeSnippet putInto="code" fiddle="0Ztcob5B">{`

            class PageController extends Controller {
               onInit() {
                  //init grid data
                  this.store.set('$page.records', Array.from({length: 100}).map((v, i)=>({
                     id: i + 1,
                     fullName: casual.full_name,
                     continent: casual.continent,
                     browser: casual.browser,
                     os: casual.operating_system,
                     visits: casual.integer(1, 100)
                  })));
               }
            }

            ...

            <Grid
                records-bind='$page.records'
                scrollable
                fixedFooter
                style={{width: "100%", height: '800px'}}
                grouping={[
                    { showFooter: true },
                    {
                        key: {
                            name: {bind: '$record.continent'}
                        },
                        showCaption: true
                    }
                ]}
                columns={[{
                    header: 'Name',
                    field: 'fullName',
                    sortable: true,
                    aggregate: 'count',
                    aggregateAlias: 'people',
                    footer: {tpl: '{$group.name|TOTAL} - {$group.people} {$group.people:plural;person}'},
                    caption: {tpl: '{$group.name} ({$group.people} {$group.people:plural;person})'}
                },
                {
                    header: 'Continent',
                    field: 'continent',
                    visible: true,
                    sortable: true,
                    aggregate: 'distinct',
                    footer: {tpl: '{$group.continent} {$group.continent:plural;continent}'},
                    caption: {tpl: '{$group.continent} {$group.continent:plural;continent}'},
                },
                {
                    header: 'Browser',
                    field: 'browser',
                    sortable: true,
                    aggregate: 'distinct',
                    footer: {tpl: '{$group.browser} {$group.browser:plural;browser}'},
                    caption: {tpl: '{$group.browser} {$group.browser:plural;browser}'}
                },
                {
                    header: 'OS',
                    field: 'os',
                    sortable: true,
                    aggregate: 'distinct',
                    footer: {tpl: '{$group.os} {$group.os:plural;OS}'},
                    caption: {tpl: '{$group.os} {$group.os:plural;OS}'}
                },
                {
                    header: 'Visits',
                    field: 'visits',
                    sortable: true,
                    aggregate: "sum",
                    align: "right",
                    format: 'n;0'
                }]}
            />
         `}</CodeSnippet>


        </CodeSplit>

    </Md>
</cx>;

Format.registerFactory('plural', (format, text) => {
    return value => plural(text, value);
});