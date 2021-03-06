"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
// Angular
const core_1 = require("@angular/core");
const material_1 = require("@angular/material");
const forms_1 = require("@angular/forms");
let ChangeHPDialogComponent = class ChangeHPDialogComponent {
    /**
     * Component constructor
     *
     * @param dialogRef: MatDialogRef<ChangeHPDialogComponent>
     * @param data: any
     */
    constructor(dialogRef, data, statusFB, customerService, router) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.statusFB = statusFB;
        this.customerService = customerService;
        this.router = router;
        // Public properties
        this.viewLoading = false;
    }
    /**
     * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
     */
    /**
     * On init
     */
    ngOnInit() {
        this.initStatus();
        // console.log(this.data.data);
    }
    initStatus() {
        // console.log(this.orderHeaderA.status);
        this.statusForm = this.statusFB.group({
            phone: [this.data.data.phone, forms_1.Validators.required]
        });
    }
    /**
     * Close dialog with false result
     */
    onNoClick() {
        this.dialogRef.close();
    }
    /**
     * Close dialog with true result
     */
    onYesClick() {
        /* Server loading imitation. Remove this */
        this.viewLoading = true;
        const controls = this.statusForm.controls;
        setTimeout(() => {
            const change = {
                // tslint:disable-next-line: object-literal-shorthand
                id_customer: this.data.data.id_customer,
                phone: controls['phone'].value
            };
            // console.log(data);
            this.customerService.updateCustomerPhone(change).subscribe(result => {
                this.result = result;
                this.router.navigate(['admin/customers/customer?=success']);
            });
            this.dialogRef.close(true); // Keep only this row
        }, 1000);
    }
};
ChangeHPDialogComponent = __decorate([
    core_1.Component({
        selector: 'kt-change-no-hp',
        templateUrl: './change-no-hp.component.html'
    }),
    __param(1, core_1.Inject(material_1.MAT_DIALOG_DATA))
], ChangeHPDialogComponent);
exports.ChangeHPDialogComponent = ChangeHPDialogComponent;
