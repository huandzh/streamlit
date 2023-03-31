FROM streamlit:init311
    MAINTAINER Huan Di <huandzh@gmail.com>

COPY . /app

RUN export NVM_DIR="$HOME/.nvm" && \. "$NVM_DIR/nvm.sh" && corepack enable && make jslint

# RUN make frontend
# RUN make install
# RUN rm -rf /app/*

# RUN apt-get remove -y make bsdmainutils protobuf-compiler && apt-get autoremove -y \
#      && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*
# COPY 首页.py /app

# CMD ["python", "-m", "streamlit", "run", "首页.py"]
