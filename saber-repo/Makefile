CC 		  = /usr/bin/gcc
CFLAGS  = -Wall -Wextra -Wmissing-prototypes -Wredundant-decls\
	-O3 -fomit-frame-pointer -march=native 
NISTFLAGS  = -Wno-unused-result -O3 -fomit-frame-pointer -march=native -std=c99 
CLANG   = clang -march=native -O3 -fomit-frame-pointer -fwrapv -Qunused-arguments
RM 		  = /bin/rm
CCWIN = /usr/bin/x86_64-w64-mingw32-gcc
CFLAGSWIN = -Wall -Wextra -Wmissing-prototypes -Wredundant-decls\
	-O3 -fomit-frame-pointer -march=native -I/usr/local/include/ -L/usr/local/lib64/ 


all: test/PQCgenKAT_kem \
     test/test_kex \
     test/kem \
	 test/test_pke \
	 test/alice \
	 test/bob \

win: test/keypair \
	 test/encrypt \
	 test/decrypt

SOURCES = pack_unpack.c poly.c fips202.c verify.c cbd.c SABER_indcpa.c kem.c file.c aes-encryption.c
HEADERS = SABER_params.h pack_unpack.h poly.h rng.h fips202.h verify.h cbd.h SABER_indcpa.h file.h aes-encryption.h

test/test_kex: $(SOURCES) $(HEADERS) rng.o test/test_kex.c
	$(CC) $(CFLAGS) -o $@ $(SOURCES) rng.o test/test_kex.c -lcrypto

test/PQCgenKAT_kem: $(SOURCES) $(HEADERS) rng.o test/PQCgenKAT_kem.c 
	$(CC) $(NISTFLAGS) -o $@ $(SOURCES) rng.o test/PQCgenKAT_kem.c -lcrypto

test/kem: $(SOURCES) $(HEADERS) rng.o test/kem.c
	$(CC) $(CFLAGS) -o $@ $(SOURCES) rng.o test/kem.c -lcrypto

test/alice: $(SOURCES) $(HEADERS) rng.o test/alice.c
	$(CC) $(CFLAGS) -o $@ $(SOURCES) rng.o test/alice.c -lcrypto

test/bob: $(SOURCES) $(HEADERS) rng.o test/bob.c
	$(CC) $(CFLAGS) -o $@ $(SOURCES) rng.o test/bob.c -lcrypto

test/aliced: $(SOURCES) $(HEADERS) rng.o test/alice-decrypt.c
	$(CC) $(CFLAGS) -o $@ $(SOURCES) rng.o test/alice-decrypt.c -lcrypto

test/keypair: $(SOURCES) $(HEADERS) rng-win.o test/alice.c
	$(CCWIN) $(CFLAGSWIN) -o $@ $(SOURCES) rng-win.o test/alice.c -l:libcrypto.a -lws2_32

test/encrypt: $(SOURCES) $(HEADERS) rng-win.o test/encrypt.c
	$(CCWIN) $(CFLAGSWIN) -o $@ $(SOURCES) rng-win.o test/encrypt.c -l:libcrypto.a -lws2_32

test/decrypt: $(SOURCES) $(HEADERS) rng-win.o test/decrypt.c
	$(CCWIN) $(CFLAGSWIN) -o $@ $(SOURCES) rng-win.o test/decrypt.c -l:libcrypto.a -lws2_32

rng.o: rng.c
	$(CC) $(NISTFLAGS) -c rng.c -lcrypto -o $@ 

rng-win.o: rng.c
	$(CCWIN) $(CFLAGSWIN) $(NISTFLAGS) -c rng.c -l:libcrypto.a -o $@ 

# fips202.o: fips202.c
# 	$(CLANG) -c $^ -o $@

.PHONY: clean test

test: 
	./test/test_kex
	./test/PQCgenKAT_kem
	./test/kem

clean:
	-$(RM) -f *.o
	-$(RM) -rf test/test_kex
	-$(RM) -rf test/kem
	-$(RM) -rf test/PQCgenKAT_kem
	-$(RM) -f *.req
	-$(RM) -f *.rsp
