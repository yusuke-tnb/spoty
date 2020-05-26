mkdir -p keys
ssh-keygen -f keys/jwt.key -t rsa -b 4096 -N "" -m PEM
openssl rsa -in keys/jwt.key -pubout -outform PEM -out keys/jwt.key.pub
