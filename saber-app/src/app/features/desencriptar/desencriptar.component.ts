import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { Subject } from 'rxjs';
import { CryptoService } from '../../core/services/crypto.service';


@Component({
    selector     : 'desencriptar',
    templateUrl  : './desencriptar.component.html',
    styleUrls    : ['./desencriptar.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class DesencriptarComponent implements OnInit, OnDestroy
{
    form: FormGroup;
    submitted: boolean;
    buffers = {
        secret: new ArrayBuffer(0),
        encapsulated: new ArrayBuffer(0),
        file: new ArrayBuffer(0)
    }
    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     * 
     */
    constructor(private _formBuilder: FormBuilder, private router: Router, private cryptoService: CryptoService)
    {
        // Set the private defaults
        this._unsubscribeAll = new Subject();

        this.submitted = false;
        this.form = this.createForm();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    ngOnInit(): void
    {
 
    }    

    /**
     * On destroy
     */
     ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    createForm(): FormGroup
    {
        return this._formBuilder.group({
            secret: [null, Validators.required],
            secretFilename: [null, Validators.required],
            file: [null, Validators.required],
            filename: [null, Validators.required],
            encapsulated: [null, Validators.required],
            encapsulatedFileName: [null, Validators.required]
        });
    }

    submit(): void {
        if (!this.form.invalid)
        {           
            const result = this.cryptoService.decrypt(this.buffers.file, this.buffers.secret, this.buffers.encapsulated);
            this.downloadFile(result, 'file-decrypted');
            this.submitted = true;
        }
    }

    redirect(): void 
    {
        this.router.navigate(['/home']);
    }

    public get f(): FormGroup['controls'] 
    { 
        return this.form.controls; 
    }    

    public fileLoad(fileInput: any, filenameCtrl: AbstractControl, formCtrl: AbstractControl, bufKey: string) {
        const reader = new FileReader();
        const file = fileInput.target.files[0];
        reader.onload = (e: any) => {
            filenameCtrl.patchValue(file.name);
            formCtrl.patchValue(file.name);
            this.buffers[bufKey] = e.target.result;
        };
        // Execute reader
        reader.readAsArrayBuffer(file);
    }

    downloadFile(data: ArrayBuffer, filename: string) {
        const blob = new Blob([data], { type: 'application/octet-stream'});
        const url = window.URL.createObjectURL(blob);

        const link = document.createElement('a');
        if (typeof link.download === 'string') {
            document.body.appendChild(link); // Firefox requires the link to be in the body
            link.download = filename;
            link.href = url;
            link.click();
            document.body.removeChild(link); // remove the link when done
        } else {
            location.replace(url);
        }

        // window.open(url);
    }

}
