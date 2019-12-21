# 将ESLint的输出结果可视化

import json
import codecs
from bs4 import BeautifulSoup
import matplotlib.pyplot as plt

# Parameters
# eslint_html_report_filename = 'eslint-report.html'
eslint_html_report_filename = 'walmart-eslint-report.html'
# eslint_html_report_filename = 'thu-eslint-report.html'

# project_name = 'elm'
project_name = 'walmart'
# project_name = 'thu'

# Load html file
f = codecs.open(eslint_html_report_filename, 'r', 'utf-8')
# print(f.read())

# Parse html
soup = BeautifulSoup(f.read(), 'html.parser')
a_nodes = soup.find_all('a')

# Count
counter_map = {}
for a_node in a_nodes:
    if counter_map.keys().__contains__(a_node.text):
        counter_map[a_node.text] += 1
    else:
        counter_map[a_node.text] = 1

# Save json file
with open(f'{project_name}_eslint_error_count.json', 'w') as fp:
    json.dump(counter_map, fp)

# Sort
counter_map = {k:v for k,v in sorted(counter_map.items(), key=lambda item: item[1], reverse=True)}
total = sum(counter_map.values())

# Visualization
fig1, ax1 = plt.subplots(figsize=(6, 5))
box = ax1.get_position()
ax1.set_position([box.x0, box.y0, box.width * 1.3, box.height])

_, _ = ax1.pie(counter_map.values(), startangle=90, radius=1.8 * 1000, counterclock=False,
               labels=['{:.1%}'.format(value/total) if value/total > 0.01 else '' for _ , value in counter_map.items()])
ax1.set_title(f'ESLint errors distribution of {project_name}, {total} errors in total')
ax1.axis('equal')
plt.legend(
    loc='upper left',
    prop={'size': 12},
    labels=[f'{value} {key}'for key, value in counter_map.items()],
    bbox_to_anchor=(0.0, 1),
    bbox_transform=fig1.transFigure
)
plt.show()

# Save figure
fig1.savefig(f'{project_name}-ESLint-statistics.png')

