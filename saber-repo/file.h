#ifndef FILE_H
#define FILE_H

#include <stdio.h>
#include <stdlib.h>
#include <stdint.h>

int write_bytes(char * filename, uint8_t * key, int bytes);
int read_bytes(char * filename, uint8_t * key, int bytes);
int read_image(char * filename, uint8_t ** file_contents, long * fileSize);

#endif