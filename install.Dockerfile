FROM streamlit:init311
    MAINTAINER Huan Di <huandzh@gmail.com>

ENV NVM_DIR /root/.nvm
ENV NVM_INC /root/.nvm/versions/node/v18.15.0/include/node
ENV NVM_DIR /root/.nvm
ENV NVM_BIN /root/.nvm/versions/node/v18.15.0/bin
ENV PATH $NVM_BIN:$PATH

RUN apt-get install -y rsync
RUN make frontend
RUN make install
