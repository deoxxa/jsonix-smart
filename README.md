Jsonix-Smart
============

Smart context for Jsonix

Overview
--------

Jsonix is a JavaScript dealie for Java's JAXB system. Take a look at
[the jsonix website](http://confluence.highsource.org/display/JSNX/Jsonix) for
more information.

Jsonix-Smart provides some additional features that make Jsonix a bit easier to
work with in node.js. Namely some integration with [xmldom](https://github.com/jindw/xmldom)
and additional runtime class generation to make it easier to pass instances of
XML elements around.

Right now it's using a vendored copy of Jsonix's runtime libraries because there
isn't an official npm release. If that changes in the future, so will
Jsonix-Smart.

Warning
-------

Every single release of this package will involve API breakages right now. I
suggest that one uses exact version specifiers if one is to use this package.

Usage
-----

Right now you'll have to build Jsonix from source to generate mappings, as the
format of the 1.2.x series is different to 1.3.x. This library has been written
against [SVN revision 277](svn://svn.code.sf.net/p/jsonix/code/trunk@277). This
SVN revision is also where the code in the vendor directory came from.

After you generate mappings, you'll have to process them with the
`jsonix-convert-mappings` program included with Jsonix-Smart.

Consider the documentation here to be lazily evaluated. If someone ever finds
and wants to use this, bug me and I'll write some docs and answer your
questions.

License
-------

* **Jsonix:** [3-clause BSD](http://confluence.highsource.org/display/JSNX/License).
* **Jsonix-Smart:** 3-clause BSD. A copy is included with the source.

Contact
-------

* GitHub ([deoxxa](http://github.com/deoxxa))
* Twitter ([@deoxxa](http://twitter.com/deoxxa))
* Email ([deoxxa@fknsrs.biz](mailto:deoxxa@fknsrs.biz))
