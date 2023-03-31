FROM dhuan/streamlit:install311 AS install
    MAINTAINER Huan Di <huandzh@gmail.com>

RUN rm -rf /usr/local/lib/python3.11/site-packages/pyspark

FROM python:3.11.2

COPY --from=install /usr/local/lib/python3.11/site-packages/ /usr/local/lib/python3.11/site-packages/

EXPOSE 8501

WORKDIR /app
COPY 首页.py /app/首页.py

CMD ["python", "-m", "streamlit", "run", "首页.py", "--server.address", "0.0.0.0"]
