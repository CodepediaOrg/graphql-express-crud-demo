const dataService = require('./data.service');

module.exports = {
    getAllOrtschaften: function () {
        return dataService.getAllOrtschaften();
    },

    getStrassen: function (args) {
        if (args.ortschaftsFachNummer) {
            return dataService.getStrassenForOrtschaft(args.ortschaftsFachNummer);
        }
        else {
            return dataService.getAllOrtschaften();
        }
    },

    getOrtschaftByFachnummer: function (args) {
        const ortschaftsFachNummer = args.ortschaftsFachNummer;
        return dataService.getOrtschaftByFachnummer(ortschaftsFachNummer);
    },

    getOrtschaftenWithStrassen: function (args) {
        return dataService.getOrtschaftenWithStrassen(args.withStrassen);
    },

    createStrasseZuOrtschaft: function ({ input }) {
        const strasse = {
            lokationsFachnummer: input.lokationsFachnummer,
            aktiv: input.aktiv,
            ortschaftLokationsFachnummer: input.ortschaftLokationsFachnummer,
            strasseBezeichnung: input.strasseBezeichnung
        }
        return dataService.createStrasseZuOrtschaft(strasse);
    },

    updateStrasse: function ({ id, input }) {
        const strasse = {
            lokationsFachnummer: input.lokationsFachnummer,
            aktiv: input.aktiv,
            ortschaftLokationsFachnummer: input.ortschaftLokationsFachnummer,
            strasseBezeichnung: input.strasseBezeichnung
        }
        const fachnummer = id;

        return dataService.updateStrasse(fachnummer, strasse);
    },

    deleteStrasse: function ({ id }) {
        const fachnummer = id;

        return dataService.deleteStrasse(fachnummer);
    }
}
