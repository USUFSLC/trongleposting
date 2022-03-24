FROM alpine

RUN mkdir -p /app
COPY . /app

RUN apk add --no-cache \ 
        gcc openssh python3 python3-dev py-pip musl-dev \
    && ssh-keygen -A \
    && adduser -D -G wheel -s /app/client.py -h /home/chatter -u 1000 chatter 
RUN pip install -r /app/requirements.txt

COPY --chown=chatter:wheel ./chatter_authorized_keys /home/chatter/.ssh/authorized_keys

RUN echo "chatter:chatter" | chpasswd

EXPOSE 22

CMD ["/usr/sbin/sshd", "-D", "-e"]