FROM alpine

RUN mkdir -p /app
COPY . /app

RUN apk add --no-cache \ 
        gcc openssh python3 python3-dev py-pip musl-dev \
    && ssh-keygen -A \
    && adduser -D -G wheel -s /app/client.py -h /home/trongle -u 1000 trongle 

RUN rm /etc/motd

RUN pip install -r /app/requirements.txt

RUN chown trongle /app/client.py
RUN echo "trongle:trongle" | chpasswd

EXPOSE 22

CMD ["/usr/sbin/sshd", "-D", "-e"]
