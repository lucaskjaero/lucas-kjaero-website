import glob
import re
import requests

latex_link_pattern = r"\\href\{(http[^}]+)\}"


class BrokenLinksError(Exception):
    def __init__(self, broken_links):
        self.broken_links = broken_links
        self.message = "There are broken links:\n" + "\n".join(broken_links)
    
    def __repr__(self):
        return self.message


def get_links_from_latex(path):
    links = []
    with open(path) as document:
        for line in document:
            links.extend(re.findall(latex_link_pattern, line))
    return links


def get_broken_links_on_resumes():
    links = []
    for resume_path in glob.glob('./resume/*.tex'):
        print("Checking resume at " + resume_path)
        broken_links = check_links(get_links_from_latex(resume_path))
        links.extend(broken_links)
    return links


def check_links(links):
    broken_links = []
    for link in links:
        print("Checking link " + link)
        try:
            result = requests.get(link)
            if result.status_code != 200:
                print("Failed to connect")
                broken_links.append(link)
        except ConnectionError as err:
            print(err)
            broken_links.append(link)

    return broken_links


def main():
    broken_links = get_broken_links_on_resumes()

    if len(broken_links) > 0:
        raise BrokenLinksError(broken_links)
    else:
        print("No broken links found")


if __name__ == "__main__":
    main()
        