import {Template} from 'meteor/templating';

import './yourCharacters.html'

Template.body.helpers({
    characters: [
        {
            CharacterID: "123abc",
            CampaignID: "123abc",
            Name: "Dirge",
            UID: "456def",
            Class: "Paladin",
            Background: "Abused as a boy. Wants to kill his father.",
            Race: "Human",
            Alignment: "Chaotic Neutral",
            Experience: 1,
            AC: 15,
            Speed: 9,
            MaxHP: 30,
            CurrHP: 20,
            MaxHitDie: 12,
            CurrHitDie: 10,
            HitDie: "1d12",
            ProficiencyBonus: 2,
            Notes: "No spells",
            //CurrentWeapon: ,
            //Features: ,
            //Inventory: ,
            Proficiencies: "",
            //Attributes: ,
            SavingThrows: "",
            SpellSlotsMax: 3,
            SpellSlotsCurr: 2,
            Statuses: ""
            //Money: 
        }
    ],
});