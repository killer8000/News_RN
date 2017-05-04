import React, {Component} from 'react';
var Realm = require('realm');
const NewsSchema={
    name:'News',
    primaryKey:'news_id',
    properties:{
        news_id:'string',
        top_image:'string',
        content:'string',
        title:'string',
        digest:'string',
        text_image0:'string',
        text_image1:'string',
        source:'string',
        state:'string' // 0,1,2 未读，已读，删除
    }
}

const DogSchema = {
    name: 'Dog',
    primaryKey: 'name',
    properties: {
        name: 'string',
        age: 'int',
        birthday: 'string'
    }
}
// Initialize a Realm with Car and Person models

export default class RealmManager extends Component {
    init() {
        if (this.realm == undefined || this.realm == null) {
            this.realm = new Realm({
                path: "test.realm",
                schema: [DogSchema,NewsSchema],
                schemaVersion: 1,
                migration: function (oldRealm, newRealm) {
                    //判断realm版本号
                if(oldRealm.schemaVersion<1){
                    //TODO 根据不同版本 定制不同功能
                }
                }
            });
        }
    }

    add(type, params) {
        this.init();
        this.realm.write(()=> {
            this.realm.create(type, params)
        });
    }

    // 'Dog','id = "10"'
    delete(type, where) {
        this.init()
        let object = this.realm.objects(type).filtered(where)
        this.realm.delete(object)
    }

    //TODO
    updateState(type, where, params) {
        this.init()
        let object = this.realm.objects(type).filtered(where)
        this.realm.write(()=> {
            object[0].state=params
        })
    }

    sort(type, where, sort, lim_start, lim_end) {
        this.init()
        return this.realm.objects(type).filtered(where).sorted(sort).slice(lim_start,lim_end)

    }

    getLenth(type,where) {
        this.init();
        return this.realm.objects(type).filtered(where).length;
    }


}