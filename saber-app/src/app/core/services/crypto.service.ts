import { Injectable } from '@angular/core';
import { ElectronService } from './electron.service';
import { EncryptedResults, Keypair } from '../interfaces/crypto.interfaces';

@Injectable({
    providedIn: 'root'
})
export class CryptoService {

    appPath: string;
    kp: Keypair;

    constructor(private electronService: ElectronService) {
        this.appPath = this.electronService.ipcRenderer.sendSync("getAppPath", "");        
    }

    keypair(): Keypair {
        const cwd = this.appPath + "\\crypto\\keypair\\";

        this.electronService.childProcess.execFileSync('keypair.exe', [], { cwd: cwd });
        const publicKey = Uint8Array.from(this.electronService.fs.readFileSync(cwd+'public.key')).buffer;
        const secretKey = Uint8Array.from(this.electronService.fs.readFileSync(cwd+'secret.key')).buffer;
            

        this.kp = {
            public: publicKey,
            secret: secretKey
        };        
        return this.kp;
    }

    encrypt(file: ArrayBuffer, publickey: ArrayBuffer): EncryptedResults {
        const publicBuffer = Buffer.from(publickey);
        const fileBuffer = Buffer.from(file);

        const cwd = this.appPath + "\\crypto\\encrypt\\";
        // Write file to disk
        this.electronService.fs.writeFileSync(cwd + "filetoencrypt", fileBuffer);
        this.electronService.fs.writeFileSync(cwd + "public.key", publicBuffer);        

        try {
            this.electronService.childProcess.execFileSync('encrypt.exe', { cwd: cwd });
        } 
        catch (error) {
            error.status;  // Might be 127 in your example.
            error.message; // Holds the message you typically want.
            error.stderr;  // Holds the stderr output. Use `.toString()`.
            error.stdout;  // Holds the stdout output. Use `.toString()`.
            console.log(error.stdout.toString());
        }

        const cipherfile = Uint8Array.from(this.electronService.fs.readFileSync(cwd+'cipher-file.bin')).buffer;
        const encapsulatedKey = Uint8Array.from(this.electronService.fs.readFileSync(cwd+'encapsulated.key')).buffer;

        return {
            cipherfile,
            encapsulatedKey
        }
    }

    decrypt(file: ArrayBuffer, secretkey: ArrayBuffer, encapsulatedkey: ArrayBuffer): ArrayBuffer {   
        const fileBuffer = Buffer.from(file);   
        const encapsulatedkeyBuffer = Buffer.from(encapsulatedkey);    
        const secretkeyBuffer = Buffer.from(secretkey);
        const cwd = this.appPath + "\\crypto\\decrypt\\";
        // Write file to disk
        this.electronService.fs.writeFileSync(cwd + "cihperfile.bin", fileBuffer);
        this.electronService.fs.writeFileSync(cwd + "encapsulated.key", encapsulatedkeyBuffer);
        this.electronService.fs.writeFileSync(cwd + "secret.key", secretkeyBuffer);   

        try {
            this.electronService.childProcess.execFileSync('decrypt.exe', { cwd: cwd });
        } 
        catch (error) {
            error.status;  // Might be 127 in your example.
            error.message; // Holds the message you typically want.
            error.stderr;  // Holds the stderr output. Use `.toString()`.
            error.stdout;  // Holds the stdout output. Use `.toString()`.
            console.log(error.stderr.toString());
        }

        const result = Uint8Array.from(this.electronService.fs.readFileSync(cwd+'file-decrypted')).buffer;

        return result;
    }

    decodeDataURI(data: string): string
    {
        let byteString;
        if (data.split(',')[0].indexOf('base64') >= 0) {
            byteString = atob(data.split(',')[1]);
        } else {
            byteString = decodeURI(data.split(',')[1]);
        }

        return byteString;
    }

}