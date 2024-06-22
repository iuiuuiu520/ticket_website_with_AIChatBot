from flask import Flask
from flask import request
import json
import requests
import pandas as pd
from langchain_core.documents import Document
from tqdm import tqdm
from langchain_community.embeddings import OllamaEmbeddings
from langchain_chroma import Chroma
from langchain_community.chat_models import ChatOllama
from langchain.chains.retrieval_qa.base import RetrievalQA
from langchain_groq import ChatGroq
from langchain.prompts import PromptTemplate
import os



app = Flask(__name__)

def getData():
    response = requests.get('http://localhost:3000/adminapi/ticket/list')

    result = response.json()

    df = pd.DataFrame(result['data'])

    df.to_csv('data.csv')

def getAIMsg(query):
    print(query)
    qa = pd.read_csv('data.csv')
    docs = []


    for index, row in tqdm(qa.iterrows(), total=len(qa), desc="Processing Rows"):
        # Extract question and answer from the current row
        companyName = row['companyName']
        origin = row['origin']
        destination = row['destination']
        time = row['showTime']
        price = row['price']
        date = row['showDate']
        url = row['url']

        # Construct the content string for the document
        product_string = f"companyName:{companyName}\n,origin:{origin}\n,destination:{destination}\n,time:{time}\n,price:{price}\n,date:{date}\n,url:{url}"

        # Define metadata for the document
        product_metadata = {
            "companyName": row['companyName'],
            "origin" : row['origin'],
            "destination" : row['destination'],
            "time" : row['showTime'],
            "price" : row['price'],
            "date" : row['showDate'],
            "url" : row['url']
        }

        # Create a Document object with the content and metadata, and add it to the list
        doc = Document(page_content=product_string, metadata=product_metadata)
        docs.append(doc)

    embeddings = OllamaEmbeddings(model='nomic-embed-text')
    db = Chroma.from_documents(docs, embeddings)



    # query = 'I want to go from johor to kuala lumpur on 19th June , please tell me the detail of cheapest ticket'
    # a = db.similarity_search(query, k=2)

    os.environ['GROQ_API_KEY'] = 'YOUR_API_KEY'
    model = ChatGroq(model='llama3-8b-8192')

    template = """Use the following pieces of context to answer the question at the end. If you don't know the answer, just say that you don't know, don't try to make up an answer.Price in RM.Keep the answer as concise as possible.
    At the end of the answer, you should give response like this: "You can purchase the ticket through this <a href='url'>link</a>"
    "Link" should be surrounded by anchor tag with valid url.
    {context}
    Question: {question}
    Helpful Answer:"""  
    QA_CHAIN_PROMPT = PromptTemplate.from_template(template)

    qa_chain = RetrievalQA.from_chain_type(
        model,
        retriever = db.as_retriever(search_type="mmr",
        search_kwargs={'k': 5, 'fetch_k': 10}),
        chain_type_kwargs={"prompt": QA_CHAIN_PROMPT}
    )

    result = qa_chain({'query': query})
    return result['result']


@app.route('/chatapi/getAIMessage',methods=['POST'])
def hello_world():
    getData()
    data = request.json
    result = getAIMsg(data['message'])
    formData = {
        "message" : result
    }
    response = json.dumps(formData)
    return response

app.run()