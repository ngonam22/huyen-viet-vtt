import { prepareActiveEffectCategories } from '../helpers/effects.mjs';
import { upgrade, applyUpgradeRule, removeUpgradeSource } from "../helpers/upgrade.ts";
import { THI_TOC } from "../helpers/config.ts";
import { ElementModal } from './element-modal.mjs'

const { api, sheets } = foundry.applications;

/**
 * Extend the basic ActorSheet with some very simple modifications
 * @extends {ActorSheetV2}
 */
export class BoilerplateActorSheet extends api.HandlebarsApplicationMixin(
    sheets.ActorSheetV2
) {
    /** @override */
    static DEFAULT_OPTIONS = {
        classes: ['boilerplate', 'actor', 'character-sheet-window'],
        position: {
            width: 600,
            height: 600,
        },
        actions: {
            onEditImage: this._onEditImage,
            viewDoc: this._viewDoc,
            createDoc: this._createDoc,
            deleteDoc: this._deleteDoc,
            toggleEffect: this._toggleEffect,
            roll: this._onRoll,
        },
        // Custom property that's merged into `this.options`
        // dragDrop: [{ dragSelector: '.draggable', dropSelector: null }],
        form: {
            submitOnChange: true,
        },
    };


    get title() {
        return game.i18n.localize('BOILERPLATE.Actor.Character.title.label') + ': ' + this.actor.name;
    }

    /** @override */
    static PARTS = {
        header: {
            template: 'systems/huyen-viet-vtt/templates/actor/header.hbs',
        },
        tabs: {
            // Foundry-provided generic template
            template: 'templates/generic/tab-navigation.hbs',
        },
        features: {
            template: 'systems/huyen-viet-vtt/templates/actor/features.hbs',
            scrollable: [""],
        },
        thiToc: {
            template: 'systems/huyen-viet-vtt/templates/actor/thiToc.hbs',
            scrollable: [""],
        },
        biography: {
            template: 'systems/huyen-viet-vtt/templates/actor/biography.hbs',
            scrollable: [""],
        },
        gear: {
            template: 'systems/huyen-viet-vtt/templates/actor/gear.hbs',
            scrollable: [""],
        },
        spells: {
            template: 'systems/huyen-viet-vtt/templates/actor/spells.hbs',
            scrollable: [""],
        },
        effects: {
            template: 'systems/huyen-viet-vtt/templates/actor/effects.hbs',
            scrollable: [""],
        },
    };

    /**
     * bat su kien onClick de Roll Dice
     * @param event
     * @param target
     * @returns {Promise<void>}
     * @private
     */
    async _onClickAction(event, target) {
        const action = target.dataset.action;

        console.log("++++ _onClickAction");

        if (action === 'roll-skill') {
            console.log('BTN CLICKED+++++')
            const result = await this.actor.rollCheck({})
            console.log(result)

            return ElementModal.show(this.actor, target.dataset.element);
        } else if (action === 'toggle-hanh-the') {
            const element = target.dataset.element;

            const video = this.element.querySelector(`#video-${element}`);
            if (!video) return;

            const active = video.classList.toggle("active");

            if (active) {
                video.currentTime = 0;
                video.play();
            } else {
                video.pause();
            }

            console.log("Ngũ hành clicked:", element);

            const [created] = await this.actor.createEmbeddedDocuments("ActiveEffect", [{
                name: `${element} Hành Thế`,
                disable: false,
                transfer: false,
                changes: [],
                flags: {
                    "huyen-viet-vtt": {
                        hanhThe: element
                    }
                }
            }])

            console.log('======', created)
            return;
        }

        return super._onClickAction(event, target);
    }

    /** @override */
    _configureRenderOptions(options) {
        super._configureRenderOptions(options);
        // Not all parts always render
        options.parts = ['header', 'tabs', 'biography'];
        // Don't show the other tabs if only limited view
        if (this.document.limited) return;
        // Control which parts show based on document subtype
        switch (this.document.type) {
            case 'character':
                options.parts.push('features','thiToc', 'gear', 'spells', 'effects');
                break;
            case 'npc':
                options.parts.push('gear', 'effects');
                break;
        }
    }

    /* -------------------------------------------- */

    /** @override */
    async _prepareContext(options) {

        const effect = this.actor.effects.find(
            e => e.flags["huyen-viet-vtt"]?.hanhThe
        );

        const hanhThe = effect?.flags["huyen-viet-vtt"]?.hanhThe;

        // Output initialization
        const context = {
            // Validates both permissions and compendium status
            editable: this.isEditable,
            owner: this.document.isOwner,
            limited: this.document.limited,
            // Add the actors document.
            actor: this.actor,
            // Add the actors's data to context.data for easier access, as well as flags.
            system: this.actor.system,
            flags: this.actor.flags,
            // Adding a pointer to CONFIG.BOILERPLATE
            config: CONFIG.BOILERPLATE,
            tabs: this._getTabs(options.parts),
            // Necessary for formInput and formFields helpers
            fields: this.document.schema.fields,
            systemFields: this.document.system.schema.fields,

            hanhThe,
            elements: ["kim", "thuy", "hoa", "moc", "tho"],
        };

        console.log('====== context')
        console.log(hanhThe)

        // Offloading context prep to a helper function
        this._prepareItems(context);

        return context;
    }

    /** @override */
    async _preparePartContext(partId, context) {
        switch (partId) {
            case 'features':
            case 'spells':
            case 'gear':
                context.tab = context.tabs[partId];
                break;
            case 'biography':
                context.tab = context.tabs[partId];
                // Enrich biography info for display
                // Enrichment turns text like `[[/r 1d20]]` into buttons
                context.enrichedBiography = await TextEditor.enrichHTML(
                    this.actor.system.biography,
                    {
                        // Whether to show secret blocks in the finished html
                        secrets: this.document.isOwner,
                        // Data to fill in for inline rolls
                        rollData: this.actor.getRollData(),
                        // Relative UUID resolution
                        relativeTo: this.actor,
                    }
                );
                break;
            case 'effects':
                context.tab = context.tabs[partId];
                // Prepare active effects
                context.effects = prepareActiveEffectCategories(
                    // A generator that returns all effects stored on the actors
                    // as well as any items
                    this.actor.allApplicableEffects()
                );
                break;
        }
        return context;
    }

    /**
     * Generates the data for the generic tab navigation template
     * @param {string[]} parts An array of named template parts to render
     * @returns {Record<string, Partial<ApplicationTab>>}
     * @protected
     */
    _getTabs(parts) {
        // If you have sub-tabs this is necessary to change
        const tabGroup = 'primary';
        // Default tab for first time it's rendered this session
        if (!this.tabGroups[tabGroup]) this.tabGroups[tabGroup] = 'biography';
        return parts.reduce((tabs, partId) => {
            const tab = {
                cssClass: '',
                group: tabGroup,
                // Matches tab property to
                id: '',
                // FontAwesome Icon, if you so choose
                icon: '',
                // Run through localization
                label: 'BOILERPLATE.Actor.Tabs.',
            };
            switch (partId) {
                case 'header':
                case 'tabs':
                    return tabs;
                case 'biography':
                    tab.id = 'biography';
                    tab.label += 'Biography';
                    break;
                case 'thiToc':
                    tab.id = 'thiToc';
                    tab.label += 'ThiToc';
                    break;
                case 'features':
                    tab.id = 'features';
                    tab.label += 'Features';
                    break;
                case 'gear':
                    tab.id = 'gear';
                    tab.label += 'Gear';
                    break;
                case 'spells':
                    tab.id = 'spells';
                    tab.label += 'Spells';
                    break;
                case 'effects':
                    tab.id = 'effects';
                    tab.label += 'Effects';
                    break;
            }
            if (this.tabGroups[tabGroup] === tab.id) tab.cssClass = 'active';
            tabs[partId] = tab;
            return tabs;
        }, {});
    }

    /**
     * Organize and classify Items for Actor sheets.
     *
     * @param {object} context The context object to mutate
     */
    _prepareItems(context) {
        // Initialize containers.
        // You can just use `this.document.itemTypes` instead
        // if you don't need to subdivide a given type like
        // this sheet does with spells
        const gear = [];
        const features = [];
        const spells = {
            0: [],
            1: [],
            2: [],
            3: [],
            4: [],
            5: [],
            6: [],
            7: [],
            8: [],
            9: [],
        };

        // Iterate through items, allocating to containers
        for (let i of this.document.items) {
            // Append to gear.
            if (i.type === 'gear') {
                gear.push(i);
            }
            // Append to features.
            else if (i.type === 'feature') {
                features.push(i);
            }
            // Append to spells.
            else if (i.type === 'spell') {
                if (i.system.spellLevel != undefined) {
                    spells[i.system.spellLevel].push(i);
                }
            }
        }

        for (const s of Object.values(spells)) {
            s.sort((a, b) => (a.sort || 0) - (b.sort || 0));
        }

        // Sort then assign
        context.gear = gear.sort((a, b) => (a.sort || 0) - (b.sort || 0));
        context.features = features.sort((a, b) => (a.sort || 0) - (b.sort || 0));
        context.spells = spells;
    }

    /**
     * Actions performed after any render of the Application.
     * Post-render steps are not awaited by the render process.
     * @param {ApplicationRenderContext} context      Prepared context data
     * @param {RenderOptions} options                 Provided render options
     * @protected
     * @override
     */
    async _onRender(context, options) {
        await super._onRender(context, options);
        this.#disableOverrides();
        // You may want to add other special handling here
        // Foundry comes with a large number of utility classes, e.g. SearchFilter
        // That you may want to implement yourself.
    }

    /**************
     *
     *   ACTIONS
     *
     **************/

    /**
     * Handle changing a Document's image.
     *
     * @this BoilerplateActorSheet
     * @param {PointerEvent} event   The originating click event
     * @param {HTMLElement} target   The capturing HTML element which defined a [data-action]
     * @returns {Promise}
     * @protected
     */
    static async _onEditImage(event, target) {
        const attr = target.dataset.edit;
        const current = foundry.utils.getProperty(this.document, attr);
        const { img } =
        this.document.constructor.getDefaultArtwork?.(this.document.toObject()) ??
        {};
        const fp = new FilePicker({
            current,
            type: 'image',
            redirectToRoot: img ? [img] : [],
            callback: (path) => {
                this.document.update({ [attr]: path });
            },
            top: this.position.top + 40,
            left: this.position.left + 10,
        });
        return fp.browse();
    }

    /**
     * Renders an embedded document's sheet
     *
     * @this BoilerplateActorSheet
     * @param {PointerEvent} event   The originating click event
     * @param {HTMLElement} target   The capturing HTML element which defined a [data-action]
     * @protected
     */
    static async _viewDoc(event, target) {
        const doc = this._getEmbeddedDocument(target);
        doc.sheet.render(true);
    }

    /**
     * Handles item deletion
     *
     * @this BoilerplateActorSheet
     * @param {PointerEvent} event   The originating click event
     * @param {HTMLElement} target   The capturing HTML element which defined a [data-action]
     * @protected
     */
    static async _deleteDoc(event, target) {
        const doc = this._getEmbeddedDocument(target);
        await doc.delete();
    }

    /**
     * Handle creating a new Owned Item or ActiveEffect for the actors using initial data defined in the HTML dataset
     *
     * @this BoilerplateActorSheet
     * @param {PointerEvent} event   The originating click event
     * @param {HTMLElement} target   The capturing HTML element which defined a [data-action]
     * @private
     */
    static async _createDoc(event, target) {
        // Retrieve the configured document class for Item or ActiveEffect
        const docCls = getDocumentClass(target.dataset.documentClass);
        // Prepare the document creation data by initializing it a default name.
        const docData = {
            name: docCls.defaultName({
                // defaultName handles an undefined type gracefully
                type: target.dataset.type,
                parent: this.actor,
            }),
        };
        // Loop through the dataset and add it to our docData
        for (const [dataKey, value] of Object.entries(target.dataset)) {
            // These data attributes are reserved for the action handling
            if (['action', 'documentClass'].includes(dataKey)) continue;
            // Nested properties require dot notation in the HTML, e.g. anything with `system`
            // An example exists in spells.hbs, with `data-system.spell-level`
            // which turns into the dataKey 'system.spellLevel'
            foundry.utils.setProperty(docData, dataKey, value);
        }

        // Finally, create the embedded document!
        await docCls.create(docData, { parent: this.actor });
    }

    /**
     * Determines effect parent to pass to helper
     *
     * @this BoilerplateActorSheet
     * @param {PointerEvent} event   The originating click event
     * @param {HTMLElement} target   The capturing HTML element which defined a [data-action]
     * @private
     */
    static async _toggleEffect(event, target) {
        const effect = this._getEmbeddedDocument(target);
        await effect.update({ disabled: !effect.disabled });
    }

    /**
     * Handle clickable rolls.
     *
     * @this BoilerplateActorSheet
     * @param {PointerEvent} event   The originating click event
     * @param {HTMLElement} target   The capturing HTML element which defined a [data-action]
     * @protected
     */
    static async _onRoll(event, target) {
        event.preventDefault();
        const dataset = target.dataset;

        // Handle item rolls.
        switch (dataset.rollType) {
            case 'item':
                const item = this._getEmbeddedDocument(target);
                if (item) return item.roll();
        }

        // Handle rolls that supply the formula directly.
        if (dataset.roll) {
            let label = dataset.label ? `[ability] ${dataset.label}` : '';
            let roll = new Roll(dataset.roll, this.actor.getRollData());
            await roll.toMessage({
                speaker: ChatMessage.getSpeaker({ actor: this.actor }),
                flavor: label,
                rollMode: game.settings.get('core', 'rollMode'),
            });
            return roll;
        }
    }

    /** Helper Functions */

    /**
     * Fetches the embedded document representing the containing HTML element
     *
     * @param {HTMLElement} target    The element subject to search
     * @returns {Item | ActiveEffect} The embedded Item or ActiveEffect
     */
    _getEmbeddedDocument(target) {
        const docRow = target.closest('li[data-document-class]');
        if (docRow.dataset.documentClass === 'Item') {
            return this.actor.items.get(docRow.dataset.itemId);
        } else if (docRow.dataset.documentClass === 'ActiveEffect') {
            const parent =
                docRow.dataset.parentId === this.actor.id
                    ? this.actor
                    : this.actor.items.get(docRow?.dataset.parentId);
            return parent.effects.get(docRow?.dataset.effectId);
        } else return console.warn('Could not find document class');
    }

    /***************
     *
     * Drag and Drop
     *
     ***************/

    /**
     * Handle the dropping of ActiveEffect data onto an Actor Sheet
     * @param {DragEvent} event                  The concluding DragEvent which contains drop data
     * @param {object} data                      The data transfer extracted from the event
     * @returns {Promise<ActiveEffect|boolean>}  The created ActiveEffect object or false if it couldn't be created.
     * @protected
     */
    async _onDropActiveEffect(event, data) {
        const aeCls = getDocumentClass('ActiveEffect');
        const effect = await aeCls.fromDropData(data);
        if (!this.actor.isOwner || !effect) return false;
        if (effect.target === this.actor)
            return this._onSortActiveEffect(event, effect);
        return aeCls.create(effect, { parent: this.actor });
    }

    /**
     * Handle a drop event for an existing embedded Active Effect to sort that Active Effect relative to its siblings
     *
     * @param {DragEvent} event
     * @param {ActiveEffect} effect
     */
    async _onSortActiveEffect(event, effect) {
        /** @type {HTMLElement} */
        const dropTarget = event.target.closest('[data-effect-id]');
        if (!dropTarget) return;
        const target = this._getEmbeddedDocument(dropTarget);

        // Don't sort on yourself
        if (effect.uuid === target.uuid) return;

        // Identify sibling items based on adjacent HTML elements
        const siblings = [];
        for (const el of dropTarget.parentElement.children) {
            const siblingId = el.dataset.effectId;
            const parentId = el.dataset.parentId;
            if (
                siblingId &&
                parentId &&
                (siblingId !== effect.id || parentId !== effect.parent.id)
            )
                siblings.push(this._getEmbeddedDocument(el));
        }

        // Perform the sort
        const sortUpdates = SortingHelpers.performIntegerSort(effect, {
            target,
            siblings,
        });

        // Split the updates up by parent document
        const directUpdates = [];

        const grandchildUpdateData = sortUpdates.reduce((items, u) => {
            const parentId = u.target.parent.id;
            const update = { _id: u.target.id, ...u.update };
            if (parentId === this.actor.id) {
                directUpdates.push(update);
                return items;
            }
            if (items[parentId]) items[parentId].push(update);
            else items[parentId] = [update];
            return items;
        }, {});

        // Effects-on-items updates
        for (const [itemId, updates] of Object.entries(grandchildUpdateData)) {
            await this.actor.items
                .get(itemId)
                .updateEmbeddedDocuments('ActiveEffect', updates);
        }

        // Update on the main actors
        return this.actor.updateEmbeddedDocuments('ActiveEffect', directUpdates);
    }

    /**
     * Handle dropping of an Actor data onto another Actor sheet
     * @param {DragEvent} event            The concluding DragEvent which contains drop data
     * @param {object} data                The data transfer extracted from the event
     * @returns {Promise<object|boolean>}  A data object which describes the result of the drop, or false if the drop was
     *                                     not permitted.
     * @protected
     */
    async _onDropActor(event, data) {
        if (!this.actor.isOwner) return false;
    }

    /* -------------------------------------------- */

    /**
     * Handle dropping of a Folder on an Actor Sheet.
     * The core sheet currently supports dropping a Folder of Items to create all items as owned items.
     * @param {DragEvent} event     The concluding DragEvent which contains drop data
     * @param {object} data         The data transfer extracted from the event
     * @returns {Promise<Item[]>}
     * @protected
     */
    async _onDropFolder(event, data) {
        if (!this.actor.isOwner) return [];
        const folder = await Folder.implementation.fromDropData(data);
        if (folder.type !== 'Item') return [];
        const droppedItemData = await Promise.all(
            folder.contents.map(async (item) => {
                if (!(document instanceof Item)) item = await fromUuid(item.uuid);
                return item;
            })
        );
        return this._onDropItemCreate(droppedItemData, event);
    }

    /**
     * Handle the final creation of dropped Item data on the Actor.
     * This method is factored out to allow downstream classes the opportunity to override item creation behavior.
     * @param {object[]|object} itemData      The item data requested for creation
     * @param {DragEvent} event               The concluding DragEvent which provided the drop data
     * @returns {Promise<Item[]>}
     * @private
     */
    async _onDropItemCreate(itemData, event) {
        itemData = itemData instanceof Array ? itemData : [itemData];
        return this.actor.createEmbeddedDocuments('Item', itemData);
    }

    /********************
     *
     * Actor Override Handling
     *
     ********************/

    /**
     * Prepare data used to update the Document upon form submission.
     * @param {SubmitEvent} event                   The originating form submission event
     * @param {HTMLFormElement} form                The form element that was submitted
     * @param {FormDataExtended} formData           Processed data for the submitted form
     * @returns {object}                            Processed data to be used for a document update
     * @protected
     * @override
     */
    _prepareSubmitData(event, form, formData) {
        const submitData = formData.object;
        const overrides = foundry.utils.flattenObject(this.actor.overrides);
        for (let k of Object.keys(overrides)) delete submitData[k];

        // 1. Ép kiểu dữ liệu (Integers/NaN handling)
        for (let [k, v] of Object.entries(submitData)) {
            if ( k.includes('abilities') || k.includes('value') || k.includes('level') || k.includes('cr') || k.includes('xp') ) {
                const val = (typeof v === 'number') ? v : parseInt(v);
                submitData[k] = isNaN(val) ? 0 : Math.floor(val);
            }
            else if (typeof v === "string" && v.trim() !== "" && !isNaN(Number(v))) {
                submitData[k] = Number(v);
            }
        }

        // 2. Xử lý logic thay đổi Thị Tộc (Clan Change)
        // Nếu người dùng thay đổi Thị Tộc, ta cập nhật lại lịch sử nâng cấp (upgrades)
        if (submitData['system.thiToc'] !== undefined) {
            const newThiTocName = submitData['system.thiToc'];
            const oldThiTocName = this.actor.system.thiToc;

            if (newThiTocName !== oldThiTocName) {
                let currentUpgrades = [...(this.actor.system.upgrades || [])];
                
                // Xóa các nâng cấp cũ của Thị Tộc khỏi lịch sử (xóa tất cả rules bắt đầu bằng thi-toc-)
                currentUpgrades = removeUpgradeSource(currentUpgrades, 'thi-toc-');

                // Tìm dữ liệu nâng cấp của Thị Tộc mới
                const thiTocData = THI_TOC.find(t => game.i18n.localize(t.ten) === newThiTocName || t.linhGiap === newThiTocName);
                
                if (thiTocData && thiTocData.upgrade) {
                    // Thêm các rule nâng cấp của Thị Tộc mới vào lịch sử
                    for (let i = 0; i < thiTocData.upgrade.length; i++) {
                        const rule = thiTocData.upgrade[i];
                        currentUpgrades = applyUpgradeRule(currentUpgrades, `thi-toc-${i}`, rule);
                    }
                    console.log(`Updated upgrades history for new Thi Toc: ${newThiTocName}`);
                }
                
                // Cập nhật lại mảng upgrades trong submitData
                submitData['system.upgrades'] = currentUpgrades;
            }
        }

        return submitData;
    }

    /**
     * Disables inputs subject to active effects
     */
    #disableOverrides() {
        const flatOverrides = foundry.utils.flattenObject(this.actor.overrides);
        for (const override of Object.keys(flatOverrides)) {
            const input = this.element.querySelector(`[name="${override}"]`);
            if (input) {
                input.disabled = true;
            }
        }
    }
}
