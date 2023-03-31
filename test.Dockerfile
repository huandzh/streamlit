FROM dhuan/streamlit:install311
    MAINTAINER Huan Di <huandzh@gmail.com>

RUN rm -rf /app/

RUN apt-get remove -y make bsdmainutils protobuf-compiler && apt-get autoremove -y \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

RUN export NVM_DIR="$HOME/.nvm" && \. "$NVM_DIR/nvm.sh"  && nvm deactivate && nvm uninstall 18.15.0

COPY 首页.py /app/首页.py

CMD ["python", "-m", "streamlit", "run", "首页.py"]
