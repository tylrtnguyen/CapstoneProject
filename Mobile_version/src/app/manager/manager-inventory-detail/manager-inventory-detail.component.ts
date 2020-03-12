import { Component, OnInit, ViewChild } from "@angular/core";
import {
    ModalDialogService,
    ModalDialogParams
} from "nativescript-angular/modal-dialog";
import { ShareService } from "~/app/share-services/share.service";
import { RadDataFormComponent } from "nativescript-ui-dataform/angular";
import { Page } from "tns-core-modules/ui/page";
import { isAndroid, isIOS, device, screen } from "tns-core-modules/platform";
import { Router } from "@angular/router";
import { Material } from "~/app/model/Material";
import { HttpClient } from "@angular/common/http";
@Component({
    selector: "ns-manager-inventory-detail",
    templateUrl: "./manager-inventory-detail.component.html",
    styleUrls: ["./manager-inventory-detail.component.css"]
})
export class ManagerInventoryDetailComponent implements OnInit {
    private _material: Material;
    private data ;
    constructor(
        public params: ModalDialogParams,
        public share: ShareService,
        private router: Router,
        private mParams: ModalDialogParams,
        private http: HttpClient
    ) {}
    @ViewChild("material_radForm", { static: false })
    MaterialRadDataForm: RadDataFormComponent;
    ngOnInit() {
        this.data = this.mParams.context.data;
        this._material = new Material(
            this.data.name,
            this.data.quantity,
            this.data.stockStatus
        );
    }
    get material(): Material {
        return this._material;
    }
    material_meta = {
        isReadOnly: false,
        commitMode: "manual",
        validationMode: "lostFocus",
        propertyAnnotations: [
            {
                name: "name",
                displayName: "Material Name : ",
                index: 0,
                validators: [
                    { name: "NonEmpty" },
                    { name: "MaximumLength", params: { length: 50 } }
                ]
            },
            {
                name: "quantity",
                displayName: "Quantity",
                index: 1,
                editor: "Number",
                validators: [
                    { name: "NonEmpty" },
                    { name: "MaximumLength", params: { length: 50 } }
                ]
            },
            {
                name: "stockStatus",
                displayName: "Status : ",
                index: 2,
                validators: [
                    { name: "NonEmpty" },
                    { name: "MaximumLength", params: { length: 50 } }
                ]
            }
        ]
    };
    submit() {
        this.MaterialRadDataForm.dataForm.commitAll();
        const em_store = this.MaterialRadDataForm.dataForm.source;
        this.http.put(
            this.share.url + `material/${this.data._id}`,
            {
                name: em_store.name,
                quantity: em_store.quantity,
                stockStatus: em_store.stockStatus
            },
            { headers: this.share.APIHeader() }
        ).subscribe(
          result=>this.params.closeCallback(),
          error=>console.log(error)
        );
    }
}
