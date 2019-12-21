import os
import random
import requests
from time import sleep
from bs4 import BeautifulSoup

BASE_URL = 'https://www.apple.com/'

HEADERS = {
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36'
}

identifier = 'apple'          # 子链接中必须包含的内容, 用于排除无关链接
project_name = 'apple'  # 项目名称

# 栈
class Stack:
    def __init__(self):
        # 成员变量
        self.items = []
        return

    def is_empty(self):  # 栈是否为空
        return len(self.items) == 0

    def size(self):  # 栈的大小
        return len(self.items)

    def peek(self):  # 栈顶元素
        return self.items[self.size() - 1]

    def push(self, item):  # 元素压栈
        self.items.append(item)
        return

    def pop(self):  # 栈顶元素出栈
        return self.items.pop()


# 布隆过滤器，避免链接重复访问
class BloomFilter:
    def __init__(self, n):
        self.n = n  # 元素数量
        self.m = 30 * n  # 位串长度
        self.vector = [0] * (self.m)  # 位串, 初始全0
        self.data = []  # 数据数组
        return

    def hash1(self, string):
        b = 378551
        a = 63689
        hash = 0
        for i in range(0, len(string)):
            hash = hash * a + ord(string[i])
            a = a * b
        return hash

    # Hash functions
    def hash2(self, string):
        hash = 1315423911
        for i in range(0, len(string)):
            hash ^= ((hash << 5) + ord(string[i]) + (hash) >> 2)
        return hash

    def hash3(self, string):
        hash = len(string)
        for i in range(0, len(string)):
            hash = ((hash << 5) ^ (hash >> 27)) ^ ord(string[i])
        return hash

    def hash4(self, string):
        hash = 0
        for i in range(0, len(string)):
            hash = (hash << 4) + ord(string[i])
            x = hash & 0xF0000000
            if (x != 0):
                hash ^= (x >> 24)
            hash &= (~x)
        return hash

    def hash5(self, string):
        seed = 131
        hash = 0
        for i in range(0, len(string)):
            hash = (hash * seed) + ord(string[i])
        return hash

    def hash6(self, string):
        hash = 0
        for i in range(0, len(string)):
            hash = ord(string[i]) + (hash << 6) + (hash << 16) - hash
        return hash

    def hash7(self, string):
        hash = 5381
        for i in range(0, len(string)):
            hash = ((hash << 5) + hash) + ord(string[i])
        return hash

    # check返回True表示可以访问, 返回False表示该地址已经访问过, 不能重复访问
    def check(self, string):
        r1 = self.hash1(string) % self.m
        r2 = self.hash2(string) % self.m
        r3 = self.hash3(string) % self.m
        r4 = self.hash4(string) % self.m
        r5 = self.hash5(string) % self.m
        r6 = self.hash6(string) % self.m
        r7 = self.hash7(string) % self.m
        # 有一个位置为0, 则元素一定不在集合中
        if self.vector[r1] == 0 or self.vector[r2] == 0 or self.vector[r3] == 0 or \
            self.vector[r4] == 0 or self.vector[r5] == 0 or self.vector[r6] == 0 or self.vector[r7] == 0:
            self.vector[r1] = 1
            self.vector[r2] = 1
            self.vector[r3] = 1
            self.vector[r4] = 1
            self.vector[r5] = 1
            self.vector[r6] = 1
            self.vector[r7] = 1
            return True
        # 全不为0, 元素大概率在集合中, 不再访问
        else:
            print('重复链接: ', string)
            return False

# 获取一个页面中的js脚本的uri
def get_js_files(url):
    print('尝试从 %s 获取js文件链接'%url)
    list = []
    try:
        r = requests.get(url=url, timeout = 5)
        r.raise_for_status()
        sleep(1)
        soup = BeautifulSoup(r.text, 'html.parser')  # 生成BeautifulSoup对象, 为后续解析做准备
        for script_node in soup.find_all('script'):
            js_uri = script_node.get('src')
            if js_uri == None:
                continue
            if js_uri.find('http') != -1:
                list.append(js_uri)
                print('成功获取js文件链接: ', js_uri)
            if js_uri[0] == '/':
                fullSrc = BASE_URL[:-1] + js_uri
                list.append(fullSrc)
                print('成功获取js文件链接: ', fullSrc)
    except:
        print('访问超时')
    return list

def get_links(url):
    print('尝试从 %s 获取子链接'%url)
    list = []
    try:
        r = requests.get(url=url, timeout = 10)
        r.raise_for_status()
        sleep(1)
        soup = BeautifulSoup(r.text, 'html.parser')
        a_nodes = soup.find_all('a')
        link_nodes = soup.find_all('link')
        for a_node in a_nodes:
            href = a_node.get('href')
            if href == None:
                continue
            elif href.find('http') != -1 and href.find(identifier) != -1:
                list.append(href)
                print('成功获取子链接: ', href)
            elif href[0] == '/':
                fullHref = BASE_URL[:-1] + href
                list.append(fullHref)
                print('成功获取子链接: ', fullHref)
        for link_node in link_nodes:
            href = link_node.get('href')
            if href == None:
                continue
            if href.find('http') != -1 and href.find(identifier) != -1:
                list.append(href)
                print('成功获取子链接: ', href)
                continue
            if href[0] == '/':
                fullHref = BASE_URL[:-1] + href
                list.append(fullHref)
                print('成功获取子链接: ', fullHref)
    except:
        print('访问超时')
    return list

def save_file(uri):
    print('从 %s 下载文件'%uri)
    path = 'dataset/' + project_name + '/js/'

    if uri.find('.') == -1 or uri.split('.')[-1] != 'js':
        filename = uri.replace('/','').replace(':','') + '.js'
    else:
        filename = uri.replace('/','').replace(':','')

    # filename = uri[uri.rfind('/')+1 :] + '.js'
    if not os.path.exists(path):
        os.makedirs(path)
    try:
        filepath = path + filename
        if not os.path.isfile(filepath):
            # deal with timeout
            text = requests.get(uri, timeout = 5).text
            sleep(1)
            # https://www.cnblogs.com/cwp-bg/p/7835434.html
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(text)
                print('成功保存js文件 ', filename)
        else:
            print('%s 文件已存在'%filepath)
    except:
        print('访问超时')

def save_html(uri):
    print('保存 %s 的网页源代码'%uri)
    path = 'dataset/' + project_name + '/html/'
    if uri[-1] == '/':
        uri = uri[:-1]
    # filename = uri[uri.rfind('/')+1:] + '.html'
    filename = uri.replace('/','').replace(':','') + '.html'
    if not os.path.exists(path):
        os.makedirs(path)
    try:
        filepath = path + filename
        if not os.path.isfile(filepath):
            text = requests.get(uri, timeout = 5).text
            sleep(1)
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(text)
                print('成功保存html文件 ', filename)
        else:
            print('%s 文件已存在'%filepath)
    except:
        print('访问超时')

if __name__ == "__main__":

    filter = BloomFilter(1000)
    linkArray = []
    linkArray.append(BASE_URL)
    # linkStack = Stack()
    # linkStack.push(BASE_URL)
    # while not linkStack.is_empty():
    while len(linkArray) > 0:
        # print('当前链接栈大小: ', linkStack.size())
        print('当前链接数量: ', len(linkArray))
        link = linkArray[int(len(linkArray) * random.random())]
        linkArray.remove(link)
        # link = linkStack.pop()
        if filter.check(link):
            save_html(uri=link)
            subLinks = get_links(link)
            for subLink in subLinks:
                linkArray.append(subLink)
                # linkStack.push(subLink)
            jsFileLinks = get_js_files(link)
            for jsFile in jsFileLinks:
                if filter.check(jsFile):
                    save_file(jsFile)
                else:
                    print('重复js文件地址不再获取')
        else:
            print('重复链接不再访问')