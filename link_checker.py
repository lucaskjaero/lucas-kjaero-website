import glob
import re
import requests

default_pattern = r"(http[^\n\)]+)"
latex_link_pattern = r"\\href\{(http[^}]+)\}"


class BrokenLinksError(Exception):
    def __init__(self, broken_links):
        self.broken_links = broken_links
        self.message = "There are broken links:\n" + "\n".join(broken_links)
    
    def __repr__(self):
        return self.message


def get_links_from_file(path, pattern=default_pattern):
    links = []
    with open(path) as document:
        for line in document:
            links.extend(re.findall(pattern, line))
    return links


def get_links_from_resumes():
    links = []
    for resume_path in glob.glob('./resume/*.tex'):
        print("Checking resume at " + resume_path)
        links.extend(get_links_from_file(resume_path, latex_link_pattern))
    return links


def get_links_from_markdown():
    links = []
    for markdown_path in glob.glob('content/**/*.md', recursive=True):
        print("Checking markdown at " + markdown_path)
        links.extend(get_links_from_file(markdown_path))
    return links


def check_links(links):
    broken_links = []
    for link in sorted(links):
        print("Checking link " + link)
        if link[:5] != "https":
            print("Insecure link")
            broken_links.append(link)

        try:
            result = requests.get(link, allow_redirects=False, timeout=30)
            if result.status_code != 200:
                print("Failed to connect, status=%s" % (result.status_code))
                broken_links.append(link)
        except Exception as err:
            print(err)
            broken_links.append(link)

    return broken_links


def main():
    links = get_links_from_resumes()
    links.extend(get_links_from_markdown())

    broken_links = check_links(set(links))

    if len(broken_links) > 0:
        raise BrokenLinksError(broken_links)
    else:
        print("No broken links found")


if __name__ == "__main__":
    main()
        