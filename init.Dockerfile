FROM python:3.11.2
    MAINTAINER Huan Di <huandzh@gmail.com>

WORKDIR /app

RUN apt-get update && apt-get install -y make bsdmainutils protobuf-compiler rsync
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
RUN pip install --upgrade pip && pip install grpcio-tools mypy-protobuf
RUN export NVM_DIR="$HOME/.nvm" && [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" && [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion" && nvm install 18.15.0 && nvm use global 18.15.0

COPY . /app


RUN export NVM_DIR="$HOME/.nvm" && \. "$NVM_DIR/nvm.sh" && corepack enable && make init

# RUN make frontend
# RUN make install
# RUN rm -rf /app/*

# RUN apt-get remove -y make bsdmainutils protobuf-compiler && apt-get autoremove -y \
#      && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*
# COPY 首页.py /app

# CMD ["python", "-m", "streamlit", "run", "首页.py"]
