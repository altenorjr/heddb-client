import Parse from 'parse';
import uuid from 'uuid/v4';

export const insertFile = (newPic) => {
    const [, contentType, extension, fileContent] = newPic.match(/data:(image\/(.+));.+,(.+)/);

    const file = new Parse.File(`${uuid()}.${extension}`, { base64: fileContent }, contentType);

    return file.save();
}

export const listAll = (model) => {
    model = typeof model === 'string' ? Parse.Object.extend(model) : model;

    return new Parse.Query(model).find();
}

export const getById = (model, id) => new Parse.Query(model).get(id);

export const remove = (model, id) => getById(model, id).then((object) => object.destroy());

export const defaultTransformation = (object, state) => {
    const data = state.data.toJS();

    return conditionalUpload(data.newPic, object, 'pic')
        .then((object) => setFields(object, data, ['name', 'bio', 'social', 'city', 'state']));
}

export const conditionalUpload = (file, object, field) => {
    const promise = file ? insertFile(file) : new Promise(r => r());

    return promise.then(file => {
        if (file) {
            object.set(field, file);
        }

        return object;
    })
}

export const setFields = (object, data, fields) => {
    for (const key of fields) {
        object.set(key, data[key]);
    }

    return object;
};

export const setRefs = (object, data, refs) => {
    const refsKeys = Object.keys(refs);

    for (const key of refsKeys) {
        object.set(key, new Parse.Object.extend(refs[key]).createWithoutData(data[key].objectId));
    }

    return object;
};