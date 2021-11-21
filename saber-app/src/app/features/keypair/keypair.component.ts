import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { Keypair } from 'app/core/interfaces/crypto.interfaces';
import { Subject } from 'rxjs';
// import { app } from 'electron';
import { CryptoService } from '../../core/services/crypto.service';


@Component({
    selector     : 'keypair',
    templateUrl  : './keypair.component.html',
    styleUrls    : ['./keypair.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class KeypairComponent implements OnInit, OnDestroy
{
    form: FormGroup;
    submitted: boolean;

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
            public: [''],
            secret: ['']
        });
    }

    submit(): void {
        if (!this.form.invalid)
        {           
            const keypair = this.cryptoService.keypair();
            this.downloadFile(keypair.public, 'public.key');
            this.downloadFile(keypair.secret, 'secret.key');

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
