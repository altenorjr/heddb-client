const { connect } = require('react-redux');
const CRUDPureComponent = require('./CRUDPureComponent').default;

module.exports = (name, statePath, redux, Container, ListItem, Editor, Filters, config = { loadFunction: 'loadRecords', loadParams: {}, afterLoad: undefined }) => {
    const {
        saveRecord,
        deleteRecord,
        requestEdition,
        requestDeletion
    } = redux;

    const Class = CRUDPureComponent(name, Container.default, ListItem.default, Editor.default, Filters, config.loadFunction, config.loadParams, config.afterLoad)

    const mapStateToProps = (state) => ({
        data: state.getIn([statePath, 'data']),
        editingItem: state.getIn([statePath, 'editingItem']),
        deletingItem: state.getIn([statePath, 'deletingItem']),
        loading: state.getIn([statePath, 'loading'])
    });

    const mapDispatchToProps = {
        [config.loadFunction]: redux[config.loadFunction],
        saveRecord,
        deleteRecord,
        requestEdition,
        requestDeletion
    }

    return connect(mapStateToProps, mapDispatchToProps)(Class);
}