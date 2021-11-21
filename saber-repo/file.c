#include "file.h"

int read_bytes(char * filename, uint8_t * key, int bytes)
{   
    FILE * pf;
    pf = fopen(filename, "rb");

    if(!pf)
    {
        printf("No se pudo abrir el archivo %s", filename);
        exit(1);
    }

    fread(key, bytes, 1, pf);
    fclose(pf);
    
    return 0;
}

int write_bytes(char * filename, uint8_t * key, int bytes)
{   
    FILE * pf;
    pf = fopen(filename, "wb+");

    if(!pf)
    {
        printf("No se pudo crear el archivo %s", filename);
        exit(1);
    }

    fwrite(key, bytes, 1, pf);
    
    return 0;
}


int read_image(char * filename, uint8_t ** file_contents, long * fileSize)
{
    FILE *f = fopen(filename, "rb");

    if(!f)
    {
        printf("No se pudo abrir el archivo %s", filename);
        exit(1);
    }

    fseek(f, 0, SEEK_END);
    long fsize = ftell(f);
    *fileSize = fsize;
    fseek(f, 0, SEEK_SET);  /* same as rewind(f); */

    *file_contents = (uint8_t *) malloc(fsize);

    fread(*file_contents, 1, fsize, f);
    fclose(f);

    return 0;
}
